---
prev: ./credits
next: ./getting-started/installation
---
# Contributions

## Bug Reports

To encourage active collaboration, Platine strongly encourages pull requests, not just bug reports. "Bug reports" may also be sent in the form of a pull request containing a failing test. Pull requests will only be reviewed when marked as "ready for review" (not in the "draft" state) and all tests for new features are passing. Lingering, non-active pull requests left in the "draft" state will be closed after a few days.

However, if you fill a bug report, your issue should contain a title and a clear description of the issue. You should also include as much relevant information as possible and a code sample that demonstrates the issue. The goal of a bug report is to make it easy for yourself - and others - to replicate the bug and develop a fix.

Remember, bug reports are created in the hope that others with the same problem will be able to collaborate with you on solving it. Do not expect that the bug report will automatically see any activity or that others will jump to fix it. Creating a bug report serves to help yourself and others start on the path of fixing the problem. If you want to chip in, you can help out by fixing [any bugs listed in our issue trackers](https://github.com/platine-php/framework/issues). You must be authenticated with GitHub to view all of issues.

The Platine source code is managed on GitHub, and there are repositories for each of the Platine packages:

- [Platine Cache](https://github.com/platine-php/cache)
- [Platine Collection](https://github.com/platine-php/collection)
- [Platine Config](https://github.com/platine-php/config)
- [Platine Console](https://github.com/platine-php/console)
- [Platine Container](https://github.com/platine-php/container)
- [Platine Cookie](https://github.com/platine-php/cookie)
- [Platine Database](https://github.com/platine-php/database)
- [Platine Docx Template](https://github.com/platine-php/docx-template)
- [Platine ETL](https://github.com/platine-php/etl)
- [Platine Event Dispatcher](https://github.com/platine-php/event-dispatcher)
- [Platine Filesystem](https://github.com/platine-php/filesystem)
- [Platine Framework](https://github.com/platine-php/framework)
- [Platine HTTP](https://github.com/platine-php/http)
- [Platine Lang](https://github.com/platine-php/lang)
- [Platine Logger](https://github.com/platine-php/logger)
- [Platine Mail](https://github.com/platine-php/mail)
- [Platine OAuth2](https://github.com/platine-php/oauth2)
- [Platine ORM](https://github.com/platine-php/orm)
- [Platine Pagination](https://github.com/platine-php/pagination)
- [Platine PDF](https://github.com/platine-php/pdf)
- [Platine Request Handler](https://github.com/platine-php/request-handler)
- [Platine Router](https://github.com/platine-php/router)
- [Platine Security](https://github.com/platine-php/security)
- [Platine Session](https://github.com/platine-php/session)
- [Platine Standard Library](https://github.com/platine-php/stdlib)
- [Platine Template](https://github.com/platine-php/template)
- [Platine Upload](https://github.com/platine-php/upload)
- [Platine User Agent](https://github.com/platine-php/user-agent)
- [Platine Validator](https://github.com/platine-php/validator)
- [Platine Webauthn](https://github.com/platine-php/webauthn)

## Support Questions

Platine's GitHub issue trackers are not intended to provide Platine help or support. Instead, use one of the following channels:

- [GitHub Discussions](https://github.com/platine-php/app/discussions)
- [StackOverflow](https://stackoverflow.com/questions/tagged/platine-php)
- [Slack](https://platineframework.slack.com)

## Core Development Discussion

You may propose new features or improvements of existing Platine behavior in the Platine framework repository's [GitHub discussion board](https://github.com/platine-php/framework/discussions). If you propose a new feature, please be willing to implement at least some of the code that would be needed to complete the feature.

Informal discussion regarding bugs, new features, and implementation of existing features takes place in the `#internals` channel of the [Platine Slack](https://platineframework.slack.com). Tony NGUEREZA, the maintainer of Platine, is typically present in the channel on weekdays from 8am-5pm (UTC+01:00 or Africa/Bangui), and sporadically present in the channel at other times.

## Which Branch?

**All** bug fixes should be sent to the latest stable branch or to the **current LTS branch**. Bug fixes should **never** be sent to the `master` branch unless they fix features that exist only in the upcoming release.

**Minor** features that are **fully backward compatible** with the current release may be sent to the latest stable branch.

**Major** new features should always be sent to the `master` branch, which contains the upcoming release.

If you are unsure if your feature qualifies as a major or minor, please ask Tony NGUEREZA in the `#internals` channel of the [Platine Slack](https://platineframework.slack.com).

## Security Vulnerabilities

If you discover a security vulnerability within Platine, please send an email to [security@platine-php.com](mailto:security@platine-php.com). All security vulnerabilities will be promptly addressed.

## Coding Style

Platine follows the [PSR-12](https://www.php-fig.org/psr/psr-12) coding standard and the [PSR-4](https://www.php-fig.org/psr/psr-4/) autoloading standard.

## PHPDoc

Below is an example of a valid Platine documentation block:

```php
<?php
/**
* Check if user is logged
*
* @param int $id
* @return bool
*
* @throws Exception
*/
public function isLogged(int $id): bool
{
    //
}
```

::: warning
 Each PHP file must start with the declaration `declare(strict_types=1);`
:::

## Code of Conduct

The Platine code of conduct is derived from the Ruby code of conduct. Any violations of the code of conduct may be reported to [platine@platine-php.com](mailto:platine@platine-php.com):

- Participants will be tolerant of opposing views.
- Participants must ensure that their language and actions are free of personal attacks and disparaging personal remarks.
- When interpreting the words and actions of others, participants should always assume good intentions.
- Behavior that can be reasonably considered harassment will not be tolerated.



