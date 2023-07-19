---
prev: ../general/providers
next: ./middleware
---
# Routing

## Basic Routing

The most basic Platine routes accept a URI and a closure, providing a very simple and expressive method of defining routes and behavior without complicated routing configuration files:

```php
<?php
return [static function (Router $router): void {
    $router->get('/', function(ServerRequestInterface $req){
        $resp = new Response();
        $resp->getBody()->write('Welcome on Platine');
        return $resp;
    }, 'welcome');
}];
```

#### The Route File

All Platine routes are defined in your route files, which are located in the `config/routes.php` directory. These files are automatically loaded by your application's during bootstrap of `HTTP Kernel`. The routes can also be registered using the method `addRoutes` inside your [Service Provider](../general/providers.md).

For most applications, you will begin by defining routes in your `config/routes.php` file. The routes defined in `config/routes.php` may be accessed by entering the defined route's URL in your browser. For example, you may access the following route by navigating to `http://example.com/user` in your browser:

```php
<?php
return [static function (Router $router): void {
    $router->get('/user', function(ServerRequestInterface $req){
        $resp = new Response();
        $resp->getBody()->write('User page');
        return $resp;
    }, 'user');
}];
```

#### Available Router Methods

The router allows you to register routes that respond to any HTTP verb:

```php
<?php
$router->get($pattern, $handler, $name, $attributes = []);
$router->post($pattern, $handler, $name, $attributes = []);
$router->put($pattern, $handler, $name, $attributes = []);
$router->head($pattern, $handler, $name, $attributes = []);
$router->options($pattern, $handler, $name, $attributes = []);
$router->delete($pattern, $handler, $name, $attributes = []);
$router->patch($pattern, $handler, $name, $attributes = []);
```

The parameter `handler` can be a string (class name or identifier of a container definition) or an instance that implements `Platine\Http\Handler\MiddlewareInterface` or `Platine\Http\Handler\RequestHandlerInterface`, a callable matching signature of `MiddlewareInterface::process()` or `RequestHandlerInterface::handle`.

Sometimes you may need to register a route that responds to multiple HTTP verbs. You may do so using the `add` method. Or, you may even register a route that responds to all HTTP verbs using the `any` method:

```php
<?php
$router->add($pattern, $handler, $methods = [], $name, $attributes = []);
$router->any($pattern, $handler, $name, $attributes = []);
```

Example:

```php
<?php
$router->add('/user', UserHandle::class, ['GET', 'POST']);
$router->any('/welcome', UserHandle::class); // GET, POST, PUT, etc. will match
```

#### Dependency Injection

If your `route handler` is an identifier of a container definition,  you may type-hint any dependencies required by your route in your route's constructor signature. The declared dependencies will automatically be resolved and injected into the callback by the Platine [service container](../general/container.md). For example, you may type-hint the `Platine\Template\Template` class to have the current HTTP request automatically injected into your route callback:

In `config/routes.php`:

```php
<?php
return [static function (Router $router): void {
    $router->get('/', WelcomeAction::class, 'welcome');
}];
```

In your `AppServiceProvider`:

```php
<?php
/**
* {@inheritdoc}
*/
public function register(): void
{
    $this->app->bind(WelcomeAction::class);
}
```

And then in your handler:

```php
<?php
/**
 * @class WelcomeAction
 * @package Platine\App\Http\Action
 */
class WelcomeAction implements RequestHandlerInterface
{
    /**
     * The template instance
     * @var Template
     */
    protected Template $template;

    /**
     * The application instance
     * @var Application
     */
    protected Application $app;

    /**
     * Create new instance
     * @param Template $template
     * @param Application $app
     */
    public function __construct(Template $template, Application $app)
    {
        $this->template = $template;
        $this->app = $app;
    }
	// ...
}
```

So the `Template` and `Application` dependencies will be resolved automatically.

!!! note
	These constructor's dependencies must to be binding in container first.

## Route Parameters

Sometimes you will need to capture segments of the URI within your route. For example, you may need to capture a user's ID from the URL. You may do so by defining route parameters:

```php
<?php
return [static function (Router $router): void {
    $router->get('/user/{id}', function(ServerRequestInterface $req){
        $id = $req->getAttribute('id');
        $resp = new Response();
        $resp->getBody()->write(sprintf('User %s page', $id));
        return $resp;
    }, 'user');
}];
```

You may define as many route parameters as required by your route:

```php
<?php
return [static function (Router $router): void {
    $router->get('/posts/{id}/comments/{comment}', function(ServerRequestInterface $req){
        $id = $req->getAttribute('id');
        $comment = $req->getAttribute('comment');
        $resp = new Response();
        $resp->getBody()->write(sprintf('Post comment: %s:%s', $id, $comment));
        return $resp;
    }, 'post');
}];
```

Route parameters are always encased within `{}` braces and should consist of alphabetic characters. Underscores (`_`) are also acceptable within route parameter names. Route parameters are injected into route callbacks / controllers on request attributes with keys as parameter names and values as parameter values.

### Optional Parameters

Occasionally you may need to specify a route parameter that may not always be present in the URI. You may do so by placing a `?` mark after the parameter name:

```php
<?php
return [static function (Router $router): void {
    $router->get('/user/{name}?', function(ServerRequestInterface $req){
        $name = $req->getAttribute('name', 'Tony');
        $resp = new Response();
        $resp->getBody()->write(sprintf('Hello %s', $name));
        return $resp;
    }, 'user');
}];
```

So `http://example.com/user/` (note the presence of last `/`) will show `Hello Tony` and `http://example.com/user/john` will show `Hello john` .

### Regular Expression Constraints

You may constrain the format of your route parameters using the `mark` after the parameter name:

- {parameter:i}: for number values
- {parameter:a}: for alpha-numeric values
- {parameter:al}: for alpha-numeric, -, _,.,  values
- {parameter:any}: for any values above.

## Named Routes

Named routes allow the convenient generation of URLs or redirects for specific routes. You may specify a name for a route by chaining the `getName` method onto the route definition or use the `3rd` or `4th` parameter:

```php
<?php
return [static function (Router $router): void {
    $router->get('/', function(ServerRequestInterface $req){
        $resp = new Response();
        $resp->getBody()->write('Hello World');
        return $resp;
    }, 'home');
    
    $router->get('/user/{name}', function(ServerRequestInterface $req){
        $name = $req->getAttribute('name');
        $resp = new Response();
        $resp->getBody()->write(sprintf('Hello %s', $name));
        return $resp;
    })->setName('user');
}];
```

#### Generating URLs To Named Routes

Once you have assigned a name to a given route, you may use the route's name when generating URLs or redirects via Platine's `Platine\Framework\Http\RouteHelper::generateUrl` method:

```php
<?php
return [static function (Router $router): void {
    $router->get('/', function(ServerRequestInterface $req){
        $resp = new Response();
        $resp->getBody()->write('Hello World');
        return $resp;
    }, 'home');
    
    $router->get('/user/{name}', function(ServerRequestInterface $req){
        $name = $req->getAttribute('name');
        $resp = new Response();
        $resp->getBody()->write(sprintf('Hello %s', $name));
        return $resp;
    })->setName('user');
}];
```

```php
<?php
$routeHelper = '...'; //instance
$homeUrl = $routeHelper->generateUrl('home'); // http://example.com/
```

If the named route defines parameters, you may pass the parameters as the second argument to the `generateUrl` method. The given parameters will automatically be inserted into the generated URL in their correct positions:

```php
<?php
$routeHelper = '...'; //instance
$userUrl = $routeHelper->generateUrl('user', ['name' => 'Tony']); // `http://example.com/user/Tony`
```

#### Accessing The Current Route

If you would like to determine the current route, you may use the request attribute with key `Route::class`. For example:

```php
<?php
return [static function (Router $router): void {
    $router->get('/user/{name}', function(ServerRequestInterface $req){
        $route = $req->getAttribute(Route::class);
        $name = $req->getAttribute('name');
        $resp = new Response();
        $resp->getBody()->write(sprintf('Hello %s, from route: %s', $name, $route->getName()));
        return $resp;
    })->setName('user');
}];
```

When type `http://example.com/user/tony` will show `Hello tony, from route: user` .

## Route Groups

Route groups allow you to share route same prefix without needing to define those on each individual route.

Nested groups attempt to intelligently "merge" prefix with their parent group. Namespace delimiters and slashes in URI prefixes are automatically added where appropriate.

```php
<?php
return [static function (Router $router): void {
    $router->group('/users', function(Router $router){
        $router->get('', function(ServerRequestInterface $req){
            $resp = new Response();
            $resp->getBody()->write('User list');
            return $resp;
        })->setName('users');
        $router->get('/{id}', function(ServerRequestInterface $req){
            $id = $req->getAttribute('id');
            $resp = new Response();
            $resp->getBody()->write(sprintf('User %s details', $id));
            return $resp;
        })->setName('user_detail');
    });
    
}];
```

URL's will look like `http://example.com/users` and `http://example.com/users/34`.

## Form Method Spoofing

HTML forms do not support `PUT`, `PATCH`, or `DELETE` actions. So, when defining `PUT`, `PATCH`, or `DELETE` routes that are called from an HTML form, you will need to add a hidden `_method` field to the form. The value sent with the `_method` field will be used as the HTTP request method:

```html
<form action="/example" method="POST">
    <input type="hidden" name="_method" value="PUT" />
</form>
```

## Cross-Origin Resource Sharing (CORS)

Platine can automatically respond to CORS `OPTIONS` HTTP requests with values that you configure. All CORS settings may be configured in your application's `config/security.php` configuration file. The `OPTIONS` requests will automatically be handled by the `Platine\Framework\Http\Middleware\CorsMiddleware` [middleware](middleware.md).
