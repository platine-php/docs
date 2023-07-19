---
prev: ./routing
next: ./action
---
# Middleware

## Introduction

Middleware provide a convenient mechanism for inspecting and filtering HTTP requests entering your application. For example, Platine includes a middleware that verifies the user of your application is authenticated. If the user is not authenticated, the middleware will redirect the user to your application's login screen. However, if the user is authenticated, the middleware will allow the request to proceed further into the application.

Additional middleware can be written to perform a variety of tasks besides authentication. For example, a logging middleware might log all incoming requests to your application. There are several middleware included in the Platine framework, including middleware for authentication and CSRF protection.

## Defining Middleware

To define a middleware just implements the `Platine\Http\Handler\MiddlewareInterface` and it's recommended to place all middleware's class within your `app/Http/Middleware` directory. 

Take an example of middleware that will only allow access to the route if the supplied `token` input matches a specified value. Otherwise, we will redirect the users back to the `home` URI:

```php
<?php
/**
 * @class DemoMiddleware
 * @package Platine\App\Http\Middleware
 */
class DemoMiddleware implements MiddlewareInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(
        ServerRequestInterface $request,
        RequestHandlerInterface $handler
    ): ResponseInterface {
        if ($request->getAttribute('token') !== 'my-secret-token') {
            return new RedirectResponse('/');
        }
        
        return $handler->handle($request);
    }
}
```

As you can see, if the given `token` does not match our secret token, the middleware will return an HTTP redirect to the client; otherwise, the request will be passed further into the application. To pass the request deeper into the application (allowing the middleware to "pass"), you should call the `handle` method of `Platine\Http\Handler\RequestHandlerInterface`.

It's best to envision middleware as a series of "layers" HTTP requests must pass through before they hit your application. Each layer can examine the request and even reject it entirely.

!!! tips
	All middleware are resolved via the [service container](../general/container.md), so you may type-hint any dependencies you need within a middleware's constructor.

#### Middleware & Responses

Of course, a middleware can perform tasks before or after passing the request deeper into the application. For example, the following middleware would perform some task **before** the request is handled by the application:

```php
<?php
/**
 * @class DemoMiddleware
 * @package Platine\App\Http\Middleware
 */
class DemoMiddleware implements MiddlewareInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(
        ServerRequestInterface $request,
        RequestHandlerInterface $handler
    ): ResponseInterface {
        // Perform action
        
        return $handler->handle($request);
    }
}
```

However, this middleware would perform its task **after** the request is handled by the application:

```php
<?php
/**
 * @class DemoMiddleware
 * @package Platine\App\Http\Middleware
 */
class DemoMiddleware implements MiddlewareInterface
{
    /**
     * {@inheritdoc}
     */
    public function process(
        ServerRequestInterface $request,
        RequestHandlerInterface $handler
    ): ResponseInterface {
        $response = $handler->handle($request);
        // Perform action
        
        return $response;
    }
}
```

!!! note
	A middleware can return an response if condition meet before the request reach the application itself.

## Registering Middleware

If you want a middleware to run during every HTTP request to your application, list the middleware class in the `config/middlewares.php` array.

!!! important
	The order is important when registering a middleware, the execution will beginning from the first to last.

