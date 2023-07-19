---
prev: ./container
next: ../overview/routing
---
# Service providers

## Introduction

Service providers are the central place of all Platine application bootstrapping. Your own application, as well as all of Platine's core services, are bootstrapped via service providers.

But, what do we mean by "bootstrapped"? In general, we mean **registering** things, including registering service container bindings, event listeners, middleware, commands and even routes. Service providers are the central place to configure your application.

If you open the `config/providers.php` file included with Platine, you will see a list of `providers`. These are all of the service provider classes that will be loaded for your application. By default, a set of Platine core service providers are listed in this array. These providers bootstrap the core Platine components, such as the database, cache, and others.

In this overview, you will learn how to write your own service providers and register them with your Platine application.

!!! tips
	If you would like to learn more about how Platine handles requests and works internally, check out our documentation on the Platine [lifecycle](lifecycle.md).

## Writing Service Providers

All service providers extend the `Platine\Framework\Service\ServiceProvider` class. Most service providers contain a `register` and a `boot` method. Within the `register` method, you should **only bind things into the [service container](container.md)**. You should never attempt to register any event listeners, routes, or any other piece of functionality within the `register` method if they have some dependencies to resolve because at the time the `register` method is called these dependencies are not yet registered.

### The Register Method

As mentioned previously, within the `register` method, you should only bind things into the [service container](container.md). You should never attempt to register any event listeners, routes, or any other piece of functionality within the `register` method. Otherwise, you may accidentally use a service that is provided by a service provider which has not loaded yet.

Let's take a look at a basic service provider. Within any of your service provider methods, you always have access to the `$app` property which provides access to the service container:

```php
<?php
 /**
 * {@inheritdoc}
 */
public function register(): void
{
    $this->app->bind(TranslatorInterface::class, GettextTranslator::class);
}
```



This service provider only defines a `register` method, and uses that method to define an implementation of `Platine\Lang\Translator\TranslatorInterface` in the service container. If you're not yet familiar with Platine's service container, check out [its documentation](container.md).

### The Boot Method

So, what if we need to register a events, commands and more within our service provider? This should be done within the `boot` method. **This method is called after all other service providers have been registered**, meaning you have access to all other services that have been registered by the framework:

```php
<?php
 /**
 * {@inheritdoc}
 */
public function boot(): void
{
    $this->addCommand(MyCommand::class);
    $this->listen(MyEvent::class, MyListener::class);
}
```



### The addRoutes Method

If you want add routes, this should be done within the `addRoutes ` method:

```php
<?php
/**
* {@inheritdoc}
*/
public function addRoutes(Router $router): void
{
    $router->post('/login', AuthAction::class, 'auth_login');
    $router->get('/user', UserAction::class, 'auth_user');
}
```

For more details see [Routing](../overview/routing.md).

### The addCommand Method

If you want add commands, this should be done using the `addCommand ` method:

```php
<?php
 /**
 * {@inheritdoc}
 */
public function boot(): void
{
    $this->addCommand(MyCommand::class);
}
```
!!! important
	The parameter should be the full class name that is binding to container or the class without constructor parameters that can be created using `new Mycommand()`

For more details see [Console application](../advanced/console.md).


### The listen Method

The `listen` method is used to listen to an event:

```php
<?php
 /**
 * {@inheritdoc}
 */
public function boot(): void
{
    $this->listen(MyEvent::class, MyListener::class);
}
```

So when the event `MyEvent::class` is fired the listener `MyListener::class` will be called.
!!! important
	If the listener parameter is a string this should be the full class name that is binding to container or the class without constructor parameters that can be created using `new MyListener()`

See [Events](../advanced/events.md) for more details.

### The subscribe Method

The `subscribe` method is used to register an subscriber:

```php
<?php
 /**
 * {@inheritdoc}
 */
public function boot(): void
{
    $this->subscribe(new MySubscriber());
 	// or use container to resolve subscriber
    $this->subscribe($this->app->get(MySubscriber::class);
}
```

See [Events](../advanced/events.md) for more details.

## Registering Providers

All service providers are registered in the `config/providers.php` configuration file. This file contains a list of the class names of your service providers. By default, a set of Platine core service providers are listed in this array. These providers bootstrap the core Platine components, such as the database, events, cache, and others.

To register your provider, add it to the array:

```php
<?php
return [
    //Framework
    LoggerServiceProvider::class,
    ErrorHandlerServiceProvider::class,
    RoutingServiceProvider::class,
    FilesystemServiceProvider::class,
    // DatabaseServiceProvider::class,
    // SessionServiceProvider::class,
    // MigrationServiceProvider::class,
    // CacheServiceProvider::class,
    TemplateServiceProvider::class,
    // CookieServiceProvider::class,
    // LangServiceProvider::class,
    CommandServiceProvider::class,
    // AuthServiceProvider::class,
    // PaginationServiceProvider::class,
    // SecurityServiceProvider::class,
    ConsoleServiceProvider::class,

    //Custom
    AppServiceProvider::class,
];
```

