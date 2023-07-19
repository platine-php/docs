---
prev: /overview
next: ./usage
---
# Installation
The recommended installation method is via Composer.
```bash
composer require platine-php/config
```
Ensure that you’ve set up your project to [autoload Composer-installed packages](https://getcomposer.org).

## Versioning
[SemVer](http://semver.org/) will be followed closely. It’s highly recommended that you use [Composer’s caret operator](https://getcomposer.org/doc/articles/versions.md#caret-version-range-) to ensure compatibility; for example: ^1.1. This is equivalent to >=1.1 <2.0.
```bash
composer require platine-php/config:^1.0
```