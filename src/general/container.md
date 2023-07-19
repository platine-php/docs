---
prev: ./lifecycle
next: ./providers
---
# Container

## Introduction

The Platine container is a powerful tool for managing class dependencies and performing dependency injection. Dependency injection is a fancy phrase that essentially means this: class dependencies are "injected" into the class via the constructor or, in some cases, "setter" methods.

Let's look at a simple example:

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
     * Create new instance
     * @param Template $template
     */
    public function __construct(Template $template)
    {
        $this->template = $template;
    }
    
    // ...
}
```

In this example, the `WelcomeAction` needs to use `Template` class, so the container will resolve this dependency automatically for you. However, since the Template is injected, we are able to easily swap it out with another implementation. We are also able to easily "mock", or create a dummy implementation of the `Template` when testing our application.

A deep understanding of the Platine container is essential to building a powerful, large application, as well as for contributing to the Platine core itself.

## Zero Configuration Resolution

If a class has no dependencies or only depends on other concrete classes (not interfaces), the container does not need to be instructed on how to resolve that class only bind the `class` in the container is enough. For example:

```php
<?php
/**
 * @class UserCreateAction
 * @package Platine\App\Http\Action
 */
class UserCreateAction implements RequestHandlerInterface
{
    /**
     * The repository instance
     * @var UserRepository
     */
    protected UserRepository $repository;

    /**
     * Create new instance
     * @param UserRepository $repository
     */
    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }
    
    // ...
}
```

In this example, hitting your application's `/users/create` route will automatically resolve the `UserRepository` class and inject it into your route's handler. This is game changing. It means you can develop your application and take advantage of dependency injection without worrying about bloated configuration files.

Thankfully, many of the classes you will be writing when building a Platine application automatically receive their dependencies via the container, including [actions](../overview/action.md), [commands](../advanced/console.md), [middleware](../overview/middleware.md), and more. Once you taste the power of automatic and zero configuration dependency injection it feels impossible to develop without it.

## When To Use The Container

Thanks to zero configuration resolution, you will often type-hint dependencies on routes, actions, event listeners, and elsewhere without ever manually interacting with the container. For example, you might type-hint the `Platine\Framework\App\Application` object on your route definition so that you can easily access the current application instance. Even though we never have to interact with the container to write this code, it is managing the injection of these dependencies behind the scenes:

```php
<?php
/**
 * @class UserCreateEventListener
 * @package Platine\App\Listener
 */
class UserCreateEventListener implements ListenerInterface
{
    /**
     * The application instance
     * @var Application
     */
    protected Application $app;

    /**
     * Create new instance
     * @param Application $app
     */
    public function __construct(Application $app)
    {
        $this->app = $app;
    }
    
    // ...
}
```

In many cases, thanks to automatic dependency injection, you can build Platine applications without **ever** manually resolving anything from the container. **So, when would you ever manually interact with the container?** Let's examine two situations.

First, if you write a class that implements an interface and you wish to type-hint that interface on a route or class constructor, you must tell the container how to resolve that interface. Secondly, if you are [writing a Platine package](../advanced/package-development.md) that you plan to share with other Platine developers, you may need to bind your package's services into the container.

## Binding

### Binding Basics

#### Simple Bindings

Almost all of your service container bindings will be registered within [service providers](providers.md), so most of these examples will demonstrate using the container in that context.

Within a service provider, you always have access to the container via the `$this->app` property. We can register a binding using the `bind` method, passing the class or interface name that we wish to register along with a closure that returns an instance of the class:

```php
<?php
 /**
 * @class ErrorHandlerServiceProvider
 * @package Platine\Framework\Service\Provider
 */
class ErrorHandlerServiceProvider extends ServiceProvider
{

    /**
     * {@inheritdoc}
     */
    public function register(): void
    {
        $this->app->bind(ErrorHandlerInterface::class, function (ContainerInterface $app) {
            return new ErrorHandler($app->get(LoggerInterface::class));
        });

        $this->app->bind(ErrorHandlerMiddleware::class, function (ContainerInterface $app) {
            return new ErrorHandlerMiddleware(
                $app->get(Config::class)->get('app.debug', false),
                $app->get(LoggerInterface::class)
            );
        });
    }
}
```

Note that we receive the container itself as an argument to the resolver. We can then use the container to resolve sub-dependencies of the object we are building.

As mentioned, you will typically be interacting with the container within service providers; however, if you would like to interact with the container outside of a service provider, you may do so via the `app` helper function:

```php
<?php
$app = app();
$app->bind(ErrorHandlerInterface::class, function (ContainerInterface $app) {
    return new ErrorHandler($app->get(LoggerInterface::class));
});
```
::: warning 
You need to bind classes into the container before use it. The container does not need to be instructed on how to build these objects if their dependencies are concrete, since it can automatically resolve these objects using reflection.
::: 
#### Binding A Singleton

The `share` method binds a class or interface into the container that should only be resolved one time. Once a singleton binding is resolved, the same object instance will be returned on subsequent calls into the container:

```php
<?php
 /**
 * {@inheritdoc}
 */
public function register(): void
{
    $this->app->share(TranslatorInterface::class, GettextTranslator::class);
    $this->app->share(Lang::class);
}
```

#### Binding Instances

You may also bind an existing object instance into the container using the `instance` method. The given instance will always be returned on subsequent calls into the container like `share`:

```php
<?php
 /**
 * {@inheritdoc}
 */
public function register(): void
{
    $service = new MyService();
    $this->app->instance($service);
    
    //using custom name
    $this->app->instance($service, 'my_custome_name');
}
```

### Binding Interfaces To Implementations

A very powerful feature of the service container is its ability to bind an interface to a given implementation. For example, let's assume we have an `TranslatorInterface` interface and a `GettextTranslator` implementation. Once we have coded our `GettextTranslator` implementation of this interface, we can register it with the service container like so:

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

This statement tells the container that it should inject the `GettextTranslator` when a class needs an implementation of `TranslatorInterface`. Now we can type-hint the `TranslatorInterface` interface in the constructor of a class that is resolved by the container. Remember, controllers, event listeners, middleware, and various other types of classes within Platine applications are always resolved using the container:

```php
<?php
/**
 * @class UserCreateAction
 * @package Platine\App\Http\Action
 */
class UserCreateAction implements RequestHandlerInterface
{
    /**
     * The translator instance
     * @var TranslatorInterface
     */
    protected TranslatorInterface $translator;

    /**
     * Create new instance
     * @param TranslatorInterface $translator
     */
    public function __construct(TranslatorInterface $translator)
    {
        $this->translator = $translator;
    }
    
    // ...
}
```

### Binding Primitives

Sometimes you may have a class that receives some injected classes, but also needs an injected primitive value such as an integer. You may easily binding to inject any value your class may need:
```php
<?php
 class MyService
{
    public function __construct(int $count){}
}
```

- Use the `bind` 3rd parameter:

```php
<?php
 /**
 * {@inheritdoc}
 */
public function register(): void
{
    $this->app->bind(MyService::class, null, [
        'count' => 19
    ]);
}
```

Use the `bind` return value that is the instance of `Platine\Container\StorageInterface`:

```php
<?php
 /**
 * {@inheritdoc}
 */
public function register(): void
{
    $this->app->bind(MyService::class)->bindParameter('count', 19);
}
```

## Resolving

### The `make` Method

You may use the `make` method to resolve a class instance from the container. The `make` method accepts the name of the class or interface you wish to resolve:

```php
<?php
 /**
 * {@inheritdoc}
 */
public function register(): void
{
    $translator = $this->app->make(TranslatorInterface::class, GettextTranslator::class);
}
```

If you are outside of a service provider in a location of your code that does not have access to the `$app` variable, you may use the `app` helper function to resolve a class instance from the container:

```php
<?php
$translator = app(TranslatorInterface::class);
```

If you would like to have the Platine container instance itself injected into a class that is being resolved by the container, you may type-hint the `Platine\Container\Container` class on your class' constructor:

```php
<?php
/**
 * @class UserCreateEventListener
 * @package Platine\App\Listener
 */
class UserCreateEventListener implements ListenerInterface
{
    /**
     * The container instance
     * @var ContainerInterface
     */
    protected ContainerInterface $container;

    /**
     * Create new instance
     * @param ContainerInterface $container
     */
    public function __construct(ContainerInterface $container)
    {
        $this->container = $container;
    }
    
    // ...
}
```

### Automatic Injection

Alternatively, and importantly, you may type-hint the dependency in the constructor of a class that is resolved by the container, including actions, event listeners, middleware, and more. In practice, this is how most of your objects should be resolved by the container.

For example, you may type-hint a repository defined by your application in a controller's constructor. The repository will automatically be resolved and injected into the class:

```php
<?php
/**
 * @class UserCreateAction
 * @package Platine\App\Http\Action
 */
class UserCreateAction implements RequestHandlerInterface
{
    /**
     * The repository instance
     * @var UserRepository
     */
    protected UserRepository $repository;

    /**
     * Create new instance
     * @param UserRepository $repository
     */
    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }
    
    // ...
}
```

For more details regarding use of container see [Package container](../packages/container.md).

