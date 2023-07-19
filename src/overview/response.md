---
prev: ./request
next: ./template
---
# Response

## Response Object

### Creating Responses

All middleware and actions should return a response to be sent back to the user's browser. Platine provides several different ways to return responses. The most basic response is returning as an instance of `Platine\Http\Response` from an action:

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
        $resp->getBody()->write('Welcome on Platine ' . $request->getMethod());
        return $resp;
    }
}
```

### Attaching Headers To Responses

Keep in mind that most response methods are chainable, allowing for the fluent construction of response instances. For example, you may use the `withHeader` method to add a series of headers to the response before sending it back to the user:

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
        
        $resp->withHeader('Content-Type', 'text/html')
                ->withHeader('X-Header-One', 'Header Value')
                ->withHeader('X-Header-Two', 'Header Value');
        
        $resp->getBody()->write('Welcome on Platine ' . $request->getMethod());
        return $resp;
    }
}
```

## Redirects

### Simple Redirect

Redirect responses are instances of the `Platine\Framework\Http\Response\RedirectResponse` class, and contain the proper headers needed to redirect the user to another URL. There are several ways to generate a `RedirectResponse` instance.

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
        return new RedirectResponse('/users');
    }
}
```

### Redirecting To Named Routes

When you want to redirect to named route you can do it with helper of `Platine\Framework\Http\RouteHelper`. For example, to generate a `RedirectResponse` to a named route `show`, you may use:

```php
<?php
class DemoAction
{
    /**
     * 
     * @var RouteHelper
     */
    protected RouteHelper $routeHelper;
    
    /**
     * 
     * @param RouteHelper $routeHelper
     */
    public function __construct(RouteHelper $routeHelper)
    {
        $this->routeHelper = $routeHelper;
    }
    /**
     * {@inheritodc}
     */
    public function show(ServerRequestInterface $request): ResponseInterface
    {
        return new RedirectResponse(
            $this->routeHelper->generateUrl('show')
        );
    }
}
```

If your route has parameters, you may pass them as the second argument to the `generateUrl` method:

```php
<?php
 <?php
class DemoAction
{
    /**
     * 
     * @var RouteHelper
     */
    protected RouteHelper $routeHelper;
    
    /**
     * 
     * @param RouteHelper $routeHelper
     */
    public function __construct(RouteHelper $routeHelper)
    {
        $this->routeHelper = $routeHelper;
    }
    /**
     * {@inheritodc}
     */
    public function show(ServerRequestInterface $request): ResponseInterface
    {
        return new RedirectResponse(
            $this->routeHelper->generateUrl('user_update', ['id' => 1])
        );
    }
}
```

Sometimes you may need to redirect to a domain outside of your application:

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
        return new RedirectResponse('https://www.google.com');
    }
}
```

## Other Response Types

You may also return other types of response instances. By default an instance of `Platine\Http\Response` can be used.

### TemplateResponse

This response is an instance of `Platine\Framework\Http\Response\TemplateResponse` is used to return an response when content is generated using the `Template Engine`.

Example:

```php
<?php
class DemoAction
{
    /**
     * The template instance
     * @var Template
     */
    protected Template $template;

    /**
     * Create new instance
     * @param Template $template
     */
    public function __construct(Template $template)
    {
        $this->template = $template;
    }
    
    /**
     * {@inheritodc}
     */
    public function show(ServerRequestInterface $request): ResponseInterface
    {
        return new TemplateResponse(
            $this->template,
            'welcome'
        );
    }
}
```

The second parameter of constructor is the name of the template.

If you need pass data to template use the 3rd parameter:

```php
<?php
 class DemoAction
{
    /**
     * The template instance
     * @var Template
     */
    protected Template $template;

    /**
     * Create new instance
     * @param Template $template
     */
    public function __construct(Template $template)
    {
        $this->template = $template;
    }
    
    /**
     * {@inheritodc}
     */
    public function show(ServerRequestInterface $request): ResponseInterface
    {
        return new TemplateResponse(
            $this->template,
            'welcome',
            [
                'foo' => 'bar'
            ]
        );
    }
}
```

You can also change HTTP status code and phrase using the 4th and 5th parameters:

```php
<?php
 class DemoAction
{
    /**
     * The template instance
     * @var Template
     */
    protected Template $template;

    /**
     * Create new instance
     * @param Template $template
     */
    public function __construct(Template $template)
    {
        $this->template = $template;
    }
    
    /**
     * {@inheritodc}
     */
    public function show(ServerRequestInterface $request): ResponseInterface
    {
        return new TemplateResponse(
            $this->template,
            'welcome',
            [
                'foo' => 'bar'
            ],
            404,
            'User not found'
        );
    }
}
```

### RedirectResponse

This response is an instance of `Platine\Framework\Http\Response\RedirectResponse`. See above for usage.

### FileResponse

This response is an instance of `Platine\Framework\Http\Response\FileResponse` it may be used to generate a response that forces the user's browser to download the file at the given path.

Example:

```php
<?php
class DemoAction
{
    /**
     * {@inheritodc}
     */
    public function show(ServerRequestInterface $request): ResponseInterface
    {
        return new FileResponse('/path/to/the/file');
    }
}
```

The 1st parameter is the path to the file to return, by default the base name of the path is used to set the `Content-Disposition` header, to set custom filename use the 2nd parameter:

```php
<?php
 class DemoAction
{
    /**
     * {@inheritodc}
     */
    public function show(ServerRequestInterface $request): ResponseInterface
    {
        return new FileResponse('/path/to/the/file', 'my_document.pdf');
    }
}
```

### JsonResponse

This response is an instance of `Platine\Framework\Http\Response\JsonResponse`. It will automatically set the `Content-Type` header to `application/json`, as well as convert the given array/object to JSON using the `Platine\Stdlib\Helper\Json` helper:

```php
<?php
 class DemoAction
{
    /**
     * {@inheritodc}
     */
    public function show(ServerRequestInterface $request): ResponseInterface
    {
        return new JsonResponse([
            [
                'id' => 1,
                'name' => 'foo',
            ],
            [
                'id' => 2,
                'name' => 'bar',
            ]
        ]);
    }
}
```

To set custom HTTP status code and reason phrase use 2nd and 3rd parameters.

### RestResponse

This response is an instance of `Platine\Framework\Http\Response\RestResponse` and is used as default response for `REST API` it extends the `JsonResponse` with support of some useful parameters for REST API.

Example with all parameters:

```php
<?php
 class DemoAction
{
    /**
     * {@inheritodc}
     */
    public function show(ServerRequestInterface $request): ResponseInterface
    {
        return new RestResponse(
             ['id' => 1, 'name' => 'foo'], 
             ['page' => 3, 'limit' => 4, 'offset' => 1], 
             true, 
             3009, 
             'OK', 
             201,
             'User created'
        );
    }
}
```

Output something

```json
{
    "success": true,
    "timestamp": 1635402892,
    "code": 3009,
    "message": "OK",
    "data": {
        "id": 1,
        "name": "foo"
    },
    "page": 3,
    "limit": 4,
    "offset": 1
}
```



The parameters description:

1. The response data that will be added to JSON `data` attribute (array, object, mixed)
2. The response `extra` that will be added to JSON attributes. (array, object)
3. The rest response status (boolean)
4. The rest response code (integer)
5. The rest response message (string)
6. The HTTP status code
7. The HTTP reason phrase.

