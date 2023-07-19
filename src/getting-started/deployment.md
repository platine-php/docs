---
prev: ./starter-project
next: ../general/lifecycle
---
# Deployment

## Introduction

When you're ready to deploy your Platine application to production, there are some important things you can do to make sure your application is running as efficiently as possible. In this document, we'll cover some great starting points for making sure your Platine application is deployed properly.

## Server Requirements

See [Requirements](../requirements.md)

## Server Configuration

### Nginx

If you are deploying your application to a server that is running Nginx, you may use the following configuration file as a starting point for configuring your web server. Most likely, this file will need to be customized depending on your server's configuration.

Please ensure, like the configuration below, your web server directs all requests to your application's `public/index.php` file. You should never attempt to move the `index.php` file to your project's root, as serving the application from the project root will expose many sensitive configuration files to the public Internet:

```ini
server {
        listen 80;
        server_name example.com;
        root /srv/example.com/public;

        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-Content-Type-Options "nosniff";

        index index.php;

        charset utf-8;

        location / {
            try_files $uri $uri/ /index.php?$query_string;
        }

        location = /favicon.ico { access_log off; log_not_found off; }
        location = /robots.txt  { access_log off; log_not_found off; }

        error_page 404 /index.php;

        location ~ \.php$ {
            fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
            fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
            include fastcgi_params;
        }

        location ~ /\.(?!well-known).* {
            deny all;
        }
    }
```

### Apache

By default we include an `.htaccess` file in the directory `public` but if you want to configure some value like virtual host of apache use the sample configuration below:

```ini
<VirtualHost *:80>
	ServerName example.com
	ServerAdmin admin@example.com
	DocumentRoot /srv/example.com/public
	LogLevel error
	ErrorLog /srv/example.com/storage/tmp/logs/apache_error.log
	CustomLog /srv/example.com/storage/tmp/logs/apache_access.log combined
	<Directory "/srv/example.com/public">
		Options +Indexes +FollowSymLinks +MultiViews
		AllowOverride All
		Order deny,allow
		deny from all
		allow from all
		Require all granted
	</Directory>
</VirtualHost>
```



## Optimization

### Composer Autoloader Optimization

When deploying to production, make sure that you are optimizing Composer's class autoloader map so Composer can quickly find the proper file to load for a given class:

```
composer install --optimize-autoloader --no-dev
```
!!! tips
	In addition to optimizing the autoloader, you should always be sure to include a `composer.lock` file in your project's source control repository. Your project's dependencies can be installed much faster when a `composer.lock` file is present.

### Optimizing Template Rendering

When deploying your application to production, you should make sure that your template files is cached, see `Platine\Template\Template` for more detail regarding how to use cache.

## Debug Mode

The debug option in your `config/app.php` configuration file determines how much information about an error is actually displayed to the user. By default, this option is set to respect the value of the `PL_APP_DEBUG` environment variable, which is stored in your `.env` file.

**In your production environment, this value should always be `false`. If the `PL_APP_DEBUG` variable is set to `true` in production, you risk exposing sensitive configuration values to your application's end users.**
