---
prev: ../user-agent/
next: ./installation
---

# Platine Validator
Platine Validator provides a set of commonly needed validation rules. It is a simple, extensible validation library with support for filtering mechanism by which multiple rules may be applied to a single data in a user-defined order.

## What is a validator?
A validator examines its input with respect to some requirements and produces a boolean result indicating whether the input successfully validates against the requirements. If the input does not meet the requirements, a validator may additionally provide information about which requirement(s) the input does not meet.

For example, a web application might require that a username be between six and twelve characters in length, and may only contain alphanumeric characters. A validator can be used for ensuring that a username meets these requirements. If a chosen username does not meet one or both of the requirements, it would be useful to know which of the requirements the username fails to meet.


## Changelog
All notable changes made in each release are shown below. See the [full list of releases](https://github.com/platine-php/validator/releases) for the complete changelog.