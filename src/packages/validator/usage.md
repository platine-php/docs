---
prev: ./installation
next: ./rules
---
# Usage
## Basic Usage
There are two steps to do before using this library:
1. Create instance of [Platine\Lang\Lang](../lang/).
1. Instantiate the validator.

```php
<?php
	use Platine\Lang\Lang;
	use Platine\Validator\Validator;

	$lang = new Lang(...);
	$validator = new Validator($lang);
```
The following example illustrates validation of an e-mail address:
```php
<?php
	$validator->addRule('email', new Email());
	$validator->validate(['email' => 'demo@example.com']);
	if ($validator->isValid()) {
	    // email appears to be valid
	} else {
	    // email is invalid; get error message
	    echo '<pre>';
		print_r($validator->getErrors());
		echo '</pre>';
	}
```
Having defined validation in this way provides the foundation which defines two methods, `isValid()` and `getErrors()`. The `isValid()` method returns true if and only if the value passes against the validation criteria.

If `isValid()` returns false, the `getErrors()` method will return an array of messages explaining the reason(s) for validation failure. The array keys are the field name that is failure, and the array values are the corresponding human-readable string messages. The values are class-dependent; each validation rule class defines its own set of validation failure messages.  
::: tip Note
The `getErrors()` methods return validation failure information only for the most recent `validate()` call. Each call to `validate()` clears any messages and errors caused by a previous `validate()` call, because it's likely that each call to `validate()` is made for a different input value.
:::
## Defining Validation Rules
Before perform the validation check, you must set the validation rules firstly. To do this you have to use the method `addRule` of `Platine\Validator\Validator` class for single rule or use `addRules` to define multiple rules for the given field. Each rule must implement `Platine\Validator\RuleInterface`.  
Example:  
```php
<?php
	$validator->addRule('email', new Email());
```
This add rule `Platine\Validator\Rule\Email` for the field named `email`, instead of add another rule for the same field, you can use the method `addRules` to do this:
```php
<?php
	$validator->addRules('email', [
	    new Email(),
	    new NotEmpty(),
	]);
```
This 1st argument is the field name and the 2nd the array of `Platine\Validator\RuleInterface`.  
## Set Validation Data

## Customizing Validation Field Name

## Filtering Data

## Translating Messages