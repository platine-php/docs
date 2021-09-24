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

In this example, the `WelcomeAction` needs to use `Template` and `Application`. So the container will resolve all the dependences needed by your class. However, since the Template is injected, we are able to easily swap it out with another implementation. We are also able to easily "mock", or create a dummy implementation of the `Template` when testing our application.

A deep understanding of the Platine container is essential to building a powerful, large application, as well as for contributing to the Platine core itself.

### Zero Configuration Resolution

If a class has no dependencies or only depends on other concrete classes (not interfaces), the container does not need to be instructed on how to resolve that class. For example:

