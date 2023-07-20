---
prev: ../contribution
next: ./configuration
---
# Installation

## Your First Platine Project

We want it to be as easy as possible to get started with Platine. There are a variety of options for developing and running a Platine project on your own computer. While you may wish to explore these options at a later time.

To get started, you only need to install [Composer 2+](https://getcomposer.org/2).

If your computer already has `PHP` and `Composer` installed, you may create a new Platine project by using Composer directly. After the application has been created, you may start Platine's local development server using the Platine CLI's `server` command:

```bash
composer create-project platine-php/app example-app
cd example-app
php platine server
```

Of course, you can change "example-app" in this command to anything you like. The Platine application's directory will be created within the directory you specify in the command argument here `example-app`.

After the project has been created, you can navigate to the application directory and start Platine development.  
If you intent to use package that need publish like [Platine Validator](../overview/validation), you must publish all the components (migration, translation, configuration file, ...) by using the Platine command below:
```bash
php platine vendor:publish platine-php/validator -a
```
::: tip Note
`platine-php/validator` is the name of the composer package and the option `-a` mean publish everything released with the given package.
:::

## Initial Configuration

All of the configuration files for the Platine framework are stored in the `config` directory. Each option is documented, so feel free to look through the files and get familiar with the options available to you.

Platine needs almost no additional configuration out of the box. You are free to get started developing! However, you may wish to review the `config/app.php` file and its documentation. It contains several options such as `timezone` and `url` that you may wish to change according to your application.

### Environment Based Configuration

Since many of Platine's configuration option values may vary depending on whether your application is running on your local computer or on a production web server, many important configuration values are defined using the `.env` file that exists at the root of your application.

Your `.env` file should not be committed to your application's source control, since each developer / server using your application could require a different environment configuration. Furthermore, this would be a security risk in the event an intruder gains access to your source control repository, since any sensitive credentials would get exposed.

::: tip Info
For more information about the `.env` file and environment based configuration, check out the full [configuration](configuration.md).
::: 
### Directory Configuration

Platine should always be served out of the root of the "web directory" configured for your web server. You should not attempt to serve a Platine application out of a subdirectory of the "web directory". Attempting to do so could expose sensitive files that exist within your application. Only `public` directory must be "web directory" of your application.

### Next step

Now that you have created your first Platine project, you may be wondering what to learn next. First, we strongly recommend becoming familiar with how Platine works by reading the next part of the documentation.

## Purpose

How you want to use Platine will also dictate the next steps on your journey. There are a variety of ways to use Platine, and we'll explore two primary use cases for the framework below.

### The Full Stack Framework

Platine may serve as a full stack framework. By "full stack" framework we mean that you are going to use Platine to route requests to your application and render your frontend via [Platine template](..//overview/template.md). This is the most common way to use the Platine framework.

If this is how you plan to use Platine, you may want to check out our documentation on [routing](../overview/routing.md), [templates](../overview/template.md), or the [ORM](../orm/getting-started.md).

::: tip Note
If you want to get a head start building your application, check out one of our official [application starter](starter-project.md).
:::

### The API Backend

Platine may also serve as an API backend to a JavaScript single-page application or mobile application. For example, you might use Platine as an API backend for your [Next.js](https://nextjs.org), [ReactJS](https://reactjs.org/), [VueJS](https://vuejs.org/), etc. application. In this context, you may use Platine to provide [authentication](../security/authentication.md) and data storage / retrieval for your application, while also taking advantage of Platine's powerful services such as emails, and more.

If this is how you plan to use Platine, you may want to check out our documentation on [routing](../overview/routing.md) and the [ORM](../orm/getting-started.md).

