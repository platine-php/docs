---
prev: ./action
next: ./response
---
# Request

## Introduction

Platine's `Platine\Http\ServerRequest` class provides an object-oriented way to interact with the current HTTP request being handled by your application as well as retrieve the input, cookies, and files that were submitted with the request.

## Interacting With The Request

### Accessing The Request

To obtain an instance of the current HTTP request via dependency injection, you should type-hint the `Platine\Http\ServerRequestInterface` class on your route closure or action method. The incoming request instance will automatically be injected by the Platine [service container](../general/container.md).

For actions class that implement `Platine\Http\Handler\RequestHandlerInterface` or `Platine\Http\Handler\MiddlewareInterface`, the `ServerRequestInterface` object already available in the parameter `$request`.

As mentioned, you may also type-hint the `Platine\Http\ServerRequestInterface` class on a route closure. The service container will automatically inject the incoming request into the closure when it is executed.

### Request Path & Method

The `Platine\Http\ServerRequest` instance provides a variety of methods for examining the incoming HTTP request and implement the `Platine\Http\ServerRequestInterface` interface. We will discuss a few of the most important methods below.

#### Retrieving The Request Path

The `getPath` method on `getUri` returns the request's path information. So, if the incoming request is targeted at `http://example.com/foo/bar`, the `getPath` method will return `/foo/bar`:

```php
<?php
$path = $request->getUri()->getPath(); // /foo/bar
```

#### Retrieving The Request URL

To retrieve the full URL for the incoming request you may cast the `getUri` method to string:

```php
<?php
$url = (string) $request->getUri(); // http://example.com/foo/bar
```

#### Retrieving The Request Method

The `getMethod` method will return the HTTP verb for the request:

```php
<?php
$method = $request->getMethod(); // GET
```

### Request Headers

You may retrieve a request header `Request` instance using the `getHeader` (array) or `getHeaderLine` (string) methods. If the header is not present on the request, `empty string` will be returned:

```php
<?php
$hostArray = $request->getHeader('Host'); // [ 0 => 'localhost']
$host = $request->getHeaderLine('Host'); // 'localhost'
$empty = $request->getHeader('Not-Found-Header'); // []
```

The `hasHeader` method may be used to determine if the request contains a given header:

```php
<?php
$host = $request->hasHeader('Host'); // true
```

## Request Data

If you want to retrieve the request data you can use the built-in class `Platine\Framework\Http\RequestData`.

```php
<?php
$input = new RequestData($request);
```

So after that you can use it to retrieve the request data using the method: 

```php
<?php
$input->cookie($key, $default); // retrieve specific cookie
$input->cookies(); // retrieve all cookies
$input->get($key, $default); // retrieve specific query
$input->gets(); // retrieve all queries
$input->post($key, $default); // retrieve specific body or json
$input->posts(); // retrieve all bodies
$input->server($key, $default); // retrieve specific server variable
$input->servers(); // retrieve all servers
$input->file($key); // retrieve specific uploaded file
$input->files(); // retrieve all uploaded files
```

Note that by default all the values is filtered in order to prevent the XSS attacks or other malicious users input, to bypass this you can use method `setAutoEscape` to disable or enable filtering:

```php
<?php
 $input->setAutoEscape(false); // Disabled
 $input->setAutoEscape(true); // Enabled
```

