---
prev: ./middleware
next: ./request
---
# Action (Controller)

Instead of defining all of your request handling logic as closures in your route files, you may wish to organize this behavior using "action" classes. Action can group related request handling logic into a single class. For example, a `UserAction` class might handle all incoming requests related to users, including showing, creating, updating, and deleting users. By default, actions are stored in the `app/Http/Action` directory.

## Writing Actions

### Basic Actions

Let's take a look at an example of a basic action. 

Note that the action can implement `Platine\Http\Handler\RequestHandlerInterface` or `Platine\Http\Handler\MiddlewareInterface` or a simple class with method  signature of  `Platine\Http\Handler\RequestHandlerInterface` or `Platine\Http\Handler\MiddlewareInterface`:

```php
<?php
/**
 * @class DemoAction
 * @package Platine\App\Http\Action
 */
class DemoAction
{
    /**
     * {@inheritodc}
     */
    public function show(ServerRequestInterface $request): ResponseInterface
    {
        $resp = new Response();
        $resp->getBody()->write('Welcome on Platine');
        return $resp;
    }
}
```

You can define a route to this controller method like so:

```php
<?php
return [static function (Router $router): void {
    $router->get('/show', sprintf('%s@%s', DemoAction::class, 'show'));
}];
```

When an incoming request matches the specified route URI, the `show` method on the `DemoAction` class will be invoked.

### Single Action

If a controller action is particularly complex, you might find it convenient to dedicate an entire controller class to that single action. To accomplish this, you may define a controller like:

```php
<?php
/**
 * @class DemoAction
 * @package Platine\App\Http\Action
 */
class DemoAction implements RequestHandlerInterface
{
    /**
     * {@inheritodc}
     */
    public function handle(ServerRequestInterface $request): ResponseInterface
    {
        $resp = new Response();
        $resp->getBody()->write('Welcome on Platine');
        return $resp;
    }
}
```

When registering routes for single action, you do not need to specify an action method. Instead, you may simply pass the class name of the action to the router:

```php
<?php
return [static function (Router $router): void {
    $router->get('/show', DemoAction::class);
}];
```

## Dependency Injection & Actions

The Platine [service container](../general/container.md) is used to resolve all Platine action. As a result, you are able to type-hint any dependencies your action may need in its constructor. The declared dependencies will automatically be resolved and injected into the controller instance:

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

