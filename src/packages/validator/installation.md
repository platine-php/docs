---
prev: ./
next: ./usage
---
# Installation
The recommended installation method is via Composer.
```bash
composer require platine-php/validator
```
Ensure that you’ve set up your project to [autoload Composer-installed packages](https://getcomposer.org) and has PHP 7.4 or above.

## Versioning
[SemVer](http://semver.org/) will be followed closely. It’s highly recommended that you use [Composer’s caret operator](https://getcomposer.org/doc/articles/versions.md#caret-version-range-) to ensure compatibility; for example: ^1.1. This is equivalent to >=1.1 <2.0.
```bash
composer require platine-php/validator:^1.0
```