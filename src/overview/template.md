---
prev: ./response
next: ./url-generation
---
# Template

## Introduction

Of course, it's not practical to return entire HTML documents strings directly from your controllers or middleware's. Thankfully, template engine provide a convenient way to place all of our HTML in separate files. Template or views separate your controller / application logic from your presentation logic and are stored by default in the `storage/resource/templates` directory (see `config/template.php` configuration). A simple template might look something like this:

```html
<!-- View stored in storage/resource/templates/welcome.html -->
<html>
    <body>
        <h1>Hello, {{ name }}</h1>
    </body>
</html>
```

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
                'name' => 'Tony'
            ]
        );
    }
}
```

Will output something like:

`Hello, Tony`

::: tip Note
Looking for more information on how to write templates? Check out the full [Template documentation](../packages/template.md) to get started.
:::
## Creating & Rendering Template

You may create a template by placing a file with the `.html` extension (is configurable) in your application's `storage/resource/templates` directory. Platine templates contain HTML as well as directives that allow you to easily echo values, create "if" statements, iterate over data, and more.

Once you have created a template, you may return it from one of your application's controllers using the `TemplateResponse`:

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
                'name' => 'Tony'
            ]
        );
    }
}
```

Or you can use an alternative below:

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
        $resp = new Response();
        $body = $this->template->render('welcome', [
            'name' => 'Tony'
        ]);
        
        $resp->getBody()->write($body);
        
        return $resp;
    }
}
```

As you can see, the first argument passed to the `render` or 2nd argument passed to `TemplateResponse` constructor corresponds to the name of the template file in the `storage/resource/templates` directory without the extension. The second or third argument is an array of data that should be made available to the template. In this case, we are passing the `name` variable, which is displayed in the view using template syntax.

### Nested Template Directories

Views may also be nested within subdirectories of the `storage/resource/templates` directory. slash is used to reference nested directory. For example, if your view is stored at `storage/resource/templates/users/profile.html`, you may return it from one of your application's controllers like so:

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
            'users/profile',
            [
                'name' => 'Tony'
            ]
        );
    }
}
```

::: tip
In the rest of documentation we will use `TemplateResponse` for examples, but you can adapt it to use template engine.
::: 
## Passing Data To Template

As you saw in the previous examples, you may pass an array of data to template to make that data available to the it:

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
            'users/profile',
            [
                'name' => 'Tony'
            ]
        );
    }
}
```

When passing information in this manner, the data should be an array with key/value pairs. After providing data to a view, you can then access each value within your view using the data's keys, such as <code v-pre>'{{ name }}'</code>.

## Optimizing Template

By default, platine template views are compiled on demand. When a request is executed that renders a view, Platine will determine if a compiled version of the view exists. If the file exists, Platine will then determine if the uncompiled view has been modified more recently than the compiled view. If the compiled view either does not exist, or the uncompiled view has been modified, Platine will recompile the view.

Compiling views during the request may have a small negative impact on performance, so Platine template provides the support of template cache that can be used to optimize the template rendering.
