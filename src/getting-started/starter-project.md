---
prev: ./architecture
next: ./deployment
---
# Starter project

## Introduction

To give you a head start building your new Platine application, we are happy to offer authentication and application starter kits. These kits automatically scaffold your application with the routes, actions, and views you need to register and authenticate your application's users.

While you are welcome to use these starter kits, they are not required. You are free to build your own application from the ground up by simply installing a fresh copy of Platine. Either way, we know you will build something great!

This starter kits is a minimal, simple implementation of all of Platine's [authentication features](../security/authentication.md), including login, registration, ... The default view layer is made up of simple [templates](../overview/template.md) styled with [Bootstrap CSS](https://getbootstrap.com/). This kit provides a wonderful starting point for beginning a fresh Platine application.

## Installation

```bash
composer create-project platine-php/starter starter-app
cd starter-app
```
Update some settings like database connection information and so on.

```bash
php platine migration:init
php platine migration:migrate
php platine seed:exec
php platine server
```

Next, you may navigate to your application URLs in your web browser.

