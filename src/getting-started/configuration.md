---
prev: ./installation
next: ./architecture
---
# Configuration

## Introduction

All of the configuration files for the Platine framework are stored in the `config` directory. Each option is documented, so feel free to look through the files and get familiar with the options available to you.

These configuration files allow you to configure things like your database connection information, your template, as well as various other core configuration values such as your application time zone and application URL.

## Environment Configuration

It is often helpful to have different configuration values based on the environment where the application is running. For example, you may wish to use a different logger level locally than you do on your production server.

To make this a cinch, in a fresh Platine installation, the root directory of your application will contain a `.env.example` file that defines many common environment variables. After the Platine installation process, this file can be copied to `.env`.

Platine's default `.env` file contains some common configuration values that may differ based on whether your application is running locally or on a production web server. These values are then retrieved from various Platine configuration files within the `config` directory using Platine's `env` helper function.

If you are developing with a team, you may wish to continue including a `.env.example` file with your application. By putting placeholder values in the example configuration file, other developers on your team can clearly see which environment variables are needed to run your application.

!!! note
	Any variable in your `.env` file can be overridden by external environment variables such as server-level or system-level environment variables.

#### Environment File Security

All variables in your `.env` files are typically parsed as strings, so some reserved values have been created to allow you to return a wider range of types from the `env()` helper function:

| `.env` Value | `env()` Value |
| ------------ | ------------- |
| true         | (bool) true   |
| TRUE         | (bool) true   |
| false        | (bool) false  |
| FALSE        | (bool) false  |
| empty        | (string) ''   |
| null         | (null) null   |
| NULL         | (null) null   |

If you need to define an environment variable with a value that contains spaces, you may do so by enclosing the value in double quotes:

```ini
PL_APP_NAME="My Application"
```

If you want to convert some value inside `.env` to some basic type you can specify in the 3rd argument of `env` or `Platine\Framework\Env\Env::get` method like below:

```php
<?php
    $bool = env('MY_BOOLEAN', false, 'bool');
	$int = env('MY_INTEGER', 0, 'int');
	$float = env('MY_FLOAT', 0.0, 'float');
	$email = env('MY_EMAIL', '', 'email');
	$ip = env('MY_IP_ADDR', '0.0.0.0', 'ip');
	$url = env('MY_URL', 'http://localhost', 'url');
	
	// same for Platine\Framework\Env\Env::get method
```

### Retrieving Environment Configuration

All of the variables listed in this file will be loaded into the `$_ENV` PHP super-global when your application receives a request. However, you may use the `env` helper or `Platine\Framework\Env\Env::get` to retrieve values from these variables in your configuration files. In fact, if you review the Platine configuration files, you will notice many of the options are already using this helper:

```php
<?php
    return [
    	// ...
		'debug' => env('PL_APP_DEBUG', true),
    	// ...
    ];
```

The second value passed to the `env` function is the "default value". This value will be returned if no environment variable exists for the given key.

### Determining The Current Environment

The current application environment is determined via the `PL_APP_ENV` variable from your `.env` file. You may access this value via the `getEnvironment` method on the `Platine\Framework\App\Application`:

```php
<?php
    use Platine\Framework\App\Application;

	$app = '...'; // get instance from container or other way
    $environment = $app->getEnvironment();
```

## Accessing Configuration Values

You may easily access your configuration values using the `Platine\Config\Config` from anywhere in your application. The configuration values may be accessed using "dot" syntax, which includes the name of the file and option you wish to access. A default value may also be specified and will be returned if the configuration option does not exist:

```php
<?php
    use Platine\Config\Config;

	$config = '...'; // get instance from container or other way
    $value = $config->get('file.config.key');
	
	// Retrieve a default value if the configuration value does not exist
	$value = $config->get('file.config.key.not.found', 'default value');

	// To set configuration values at runtime
	$config->set('file.config.key', 'value of config');
```

## Debug Mode

The `debug` option in your `config/app.php` configuration file determines how much information about an error is actually displayed to the user. By default, this option is set to respect the value of the `PL_APP_DEBUG` environment variable, which is stored in your `.env` file.

For local development, you should set the `PL_APP_DEBUG` environment variable to `true`. **In your production environment, this value should always be `false`. If the variable is set to `true` in production, you risk exposing sensitive configuration values to your application's end users.**

!!! tips
	`Platine\Config\Config` implements `ArrayAccess` so you can easily access or set the configuration values using array direct access, see example below:

```php
<?php
// get the value
$value = $config['file.config.key'];

// set the value
$config['file.config.key'] = 'value';
```

