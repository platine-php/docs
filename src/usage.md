---
prev: /installation
next: ./loader
---
# Usage
## Basic Usage
There are three steps to using this library:
1. Create configurations based on loader
1. Define loader
1. Instantiate the configuration

Simply define your configuration, set the values, and then fetch them where needed:

1. Create configurations based on loader 

We will use `Platine\Config\FileLoader` as example of loader and set the configuration file path to `config/app.php`, so the loader will search for configuration file under directory `config`. Below the content of `config/app.php`

```php
<?php
	return [
	    'name' => 'Platine', 
	    'version' => '1.0.0', 
	    'log_level' => 'error', 
	    'db' => [
	        'local' => [
	            'host' => 'localhost'
	        ],
	        'shared' => [
	            'host' => '192.168.10.1'
	        ],
	        'balancer' => [
	            'host' => '100.111.222.2'
	        ]
	    ]
	];
```

1. Define loader

```php
<?php
use Platine\Config\FileLoader;

$loader = new FileLoader('config');
```

1. Instantiate the configuration

```php
<?php
use Platine\Config\Config;

$cfg = new Config($loader, '');
```

Example (fetch the configuration):
```php
<?php
echo $cfg->get('app.name'); // Platine
echo $cfg->get('app.version'); // 1.0.0
echo $cfg->get('app.log_level'); // error
echo $cfg->get('app.db.local.host'); // localhost
echo $cfg->get('app.db.balancer.host'); // 100.111.222.2
```

Example (check existance):
```php
<?php
echo $cfg->has('app.name'); // true
echo $cfg->has('app.version'); // true
echo $cfg->has('app.log_level'); // true
echo $cfg->has('app.db.local.host'); // true
echo $cfg->has('app.db.balancer.host'); // true
echo $cfg->has('app.db.local.port'); // false
echo $cfg->has('app.env'); // false
echo $cfg->has('not.found.key'); // false
```

Example (set configuration at runtime):
```php
<?php
echo $cfg->has('app.env'); // false
$cfg->set('app.env', 'dev');
echo $cfg->has('app.env'); // true
echo $cfg->get('app.env'); // dev
```

## Environment based configuration
Configuration can be loaded base on the environment (dev, staging, production, etc.).
The second argument of `Platine\Config\Config` contains the environment to be used.
We still use `Platine\Config\FileLoader` as example and `config` as configurations scan directory.
The configuration instance for environment named `dev` will be created like:

```php
<?php
use Platine\Config\Config;

$cfg = new Config($loader, 'dev');
```
Below the content of `config/dev/app.php`:
```php
<?php
	return [
	    'log_level' => 'debug',   
	];
```

Example (fetch the configuration):
```php
<?php
echo $cfg->get('app.name'); // Platine
echo $cfg->get('app.version'); // 1.0.0
echo $cfg->get('app.log_level'); // debug
echo $cfg->get('app.db.local.host'); // localhost
echo $cfg->get('app.db.balancer.host'); // 100.111.222.2
```

## Array access support
Platine config implements `ArrayAccess` so you can check, set, fetch configuration using array access syntax.

Example (fetch the configuration):
```php
<?php
echo $cfg['app.name']; // Platine
echo $cfg['app.version']; // 1.0.0
echo $cfg['app.log_level']; // error
echo $cfg['app.db.local.host']; // localhost
echo $cfg['app.db.balancer.host']; // 100.111.222.2
```

Example (check existance):
```php
<?php
echo isset($cfg['app.name']); // true
echo isset($cfg['app.version']); // true
echo isset($cfg['app.log_level']); // true
echo isset($cfg['app.db.local.host']); // true
echo isset($cfg['app.db.balancer.host']); // true
echo isset($cfg['app.db.local.port']); // false
echo isset($cfg['app.env']); // false
echo isset($cfg['not.found.key']); // false
```

Example (set configuration at runtime):
```php
<?php
echo isset($cfg['app.db.local.port']); // false
$cfg['app.db.local.port'] = 8080;
echo isset($cfg['app.db.local.port']); // true
echo $cfg['app.db.local.port']; // 8080
```