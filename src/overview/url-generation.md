---
prev: ./template
next: ./session
---
# URL generation

## Introduction

Platine provides several helpers to assist you in generating URLs for your application. These helpers are primarily helpful when building links in your templates and API responses, or when generating redirect responses to another part of your application.

## Generating URLs

The `Platine\Framework\Http\RouteHelper` helper class may be used to generate arbitrary URLs for your application. The generated URL will automatically use the scheme (HTTP or HTTPS) and host from the current request being handled by the application:

```php
<?php
 class DemoAction
{
    /**
     * @var RouteHelper
     */
    protected RouteHelper $routeHelper;

    /**
     * Create new instance
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
        $homeUrl = $this->routeHelper->generateUrl('welcome');
        
        return new RedirectResponse($homeUrl);
    }
}
```
To generate URL for route with parameters use the second parameter:

```php
<?php
 class DemoAction
{
    /**
     * @var RouteHelper
     */
    protected RouteHelper $routeHelper;

    /**
     * Create new instance
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
        /*
        inside config/routes.php
        return [static function (Router $router): void {
	        $router->get('/user/{id}', UserAction::class);
        }];
        */
        $userUrl = $this->routeHelper->generateUrl('user', ['id' => 23]);
        
        return new RedirectResponse($userUrl);
    }
}
```



!!! note
	`RouteHelper` is only used for a named route

## Accessing The Current URL

You can access the current URL using the `Platine\Http\ServerRequestInterface` instance

```php
<?php
 class DemoAction
{
    /**
     * {@inheritodc}
     */
    public function show(ServerRequestInterface $request): ResponseInterface
    {
        $currentUrl = (string) $request->getUri();
        
        $resp = new Response();
        $resp->getBody()->write($currentUrl);
        
        return $resp;
    }
}
```



