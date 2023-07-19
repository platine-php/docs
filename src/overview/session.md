---
prev: ./url-generation
next: ./validation
---
# Session

## Introduction

Since HTTP driven applications are stateless, sessions provide a way to store information about the user across multiple requests. That user information is typically placed in a persistent store / backend that can be accessed from subsequent requests.

Platine ships with a variety of session backends that are accessed through an expressive, unified API. Support for popular backends such as file, database, etc., you can also create your own driver to fill full your requirements.

### Configuration

Your application's session configuration file is stored at `config/session.php`. Be sure to review the options available to you in this file. By default, Platine is configured to use the `file` session driver, which will work well for many applications. If your application will be load balanced across multiple web servers, you should choose a centralized store that all servers can access, such as Redis or a database.

The session `driver` configuration option defines where session data will be stored for each request. Platine ships with several great drivers out of the box.

## Interacting With The Session

The class `Platine\Session\Session` is the base class to interact with session.

### Retrieving Data

Retrieving session data is simple like below:

```php
<?php
 class DemoAction
{
    /**
     * @var Session
     */
    protected Session $session;

    /**
     * Create new instance
     * @param Session $session
     */
    public function __construct(Session $session)
    {
        $this->session = $session;
    }

    /**
     * {@inheritodc}
     */
    public function show(ServerRequestInterface $request): ResponseInterface
    {
        $userId = $this->session->get('user_id');
        
        $resp = new Response();
        $resp->getBody()->write('User id: ' . $userId);
        
        return $resp;
    }
}
```

When you retrieve an item from the session, you may also pass a default value as the second argument to the `get` method. This default value will be returned if the specified key does not exist in the session:

```php
<?php
 class DemoAction
{
    /**
     * @var Session
     */
    protected Session $session;

    /**
     * Create new instance
     * @param Session $session
     */
    public function __construct(Session $session)
    {
        $this->session = $session;
    }

    /**
     * {@inheritodc}
     */
    public function show(ServerRequestInterface $request): ResponseInterface
    {
        $userId = $this->session->get('user_id', 5);
        
        $resp = new Response();
        $resp->getBody()->write('User id: ' . $userId);
        
        return $resp;
    }
}
```

#### Retrieving All Session Data

If you would like to retrieve all the data in the session, you may use the `all` method:

```php
<?php
 class DemoAction
{
    /**
     * @var Session
     */
    protected Session $session;

    /**
     * Create new instance
     * @param Session $session
     */
    public function __construct(Session $session)
    {
        $this->session = $session;
    }

    /**
     * {@inheritodc}
     */
    public function show(ServerRequestInterface $request): ResponseInterface
    {
       	$sessions = $this->session->all();
        return new JsonResponse($sessions);
    }
}
```

Note to include flash session data you may use the parameter of method `all` :

```php
<?php
 class DemoAction
{
    /**
     * @var Session
     */
    protected Session $session;

    /**
     * Create new instance
     * @param Session $session
     */
    public function __construct(Session $session)
    {
        $this->session = $session;
    }

    /**
     * {@inheritodc}
     */
    public function show(ServerRequestInterface $request): ResponseInterface
    {
       	$sessions = $this->session->all(true);
        return new JsonResponse($sessions);
    }
}
```

#### Determining If An Item Exists In The Session

To determine if an item is present in the session, you may use the `has` method. The `has` method returns `true` if the item is present and is not `null`:

```php
<?php
 class DemoAction
{
    /**
     * @var Session
     */
    protected Session $session;

    /**
     * Create new instance
     * @param Session $session
     */
    public function __construct(Session $session)
    {
        $this->session = $session;
    }

    /**
     * {@inheritodc}
     */
    public function show(ServerRequestInterface $request): ResponseInterface
    {
       	if(!$this->session->has('user_id')){
            return new RedirectResponse('/');
        }
        
        return new Response();
    }
}
```

### Storing Data

To store data in the session, you will typically use the method  `set`:

```php
<?php
 class DemoAction
{
    /**
     * @var Session
     */
    protected Session $session;

    /**
     * Create new instance
     * @param Session $session
     */
    public function __construct(Session $session)
    {
        $this->session = $session;
    }

    /**
     * {@inheritodc}
     */
    public function show(ServerRequestInterface $request): ResponseInterface
    {
        $this->session->set('user_id', 4);
        
        $sessions = $this->session->all();
        return new JsonResponse($sessions);
    }
}
```

### Deleting An Item

The `remove` method is used to delete an item from the session:

```php
<?php
 class DemoAction
{
    /**
     * @var Session
     */
    protected Session $session;

    /**
     * Create new instance
     * @param Session $session
     */
    public function __construct(Session $session)
    {
        $this->session = $session;
    }

    /**
     * {@inheritodc}
     */
    public function show(ServerRequestInterface $request): ResponseInterface
    {
        $this->session->remove('user_id');
        
        $sessions = $this->session->all();
        return new JsonResponse($sessions);
    }
}
```

### Flash Data

Sometimes you may wish to store items in the session for the next request. You may do so using the `session flash` feature. Data stored in the session using the `xxxFlash` method will be available immediately and during the subsequent HTTP request. After the subsequent HTTP request, the flashed data will be deleted. Flash data is primarily useful for short-lived status messages:

```php
<?php
 class DemoAction
{
    /**
     * @var Session
     */
    protected Session $session;

    /**
     * Create new instance
     * @param Session $session
     */
    public function __construct(Session $session)
    {
        $this->session = $session;
    }

    /**
     * {@inheritodc}
     */
    public function show(ServerRequestInterface $request): ResponseInterface
    {
        $this->session->setFlash('message', 'User created');
        
        $message = $this->session->getFlash('message');
        return new JsonResponse($message);
    }
}
```
::: tip Note
Session key can be used with "dot" notation.
::: 
## Adding Custom Session Drivers

#### Implementing The Driver

If none of the existing session drivers fit your application's needs, Platine makes it possible to write your own session handler. Your custom session driver should implement PHP's built-in `SessionHandlerInterface`. This interface contains just a few simple methods:

```php
<?php
  class MySessionDriver implements SessionHandlerInterface
{
    public function close(): bool
    {
        return true;
    }
    
    public function destroy(string $session_id): bool
    {
        return true;
    }
    
    public function gc(int $maxlifetime): int
    {
        return 1;
    }
    
    public function open(string $save_path, string $session_name): bool
    {
        return true;
    }
    
    public function read(string $session_id): string
    {
        return '';
    }
    
    public function write(string $session_id, string $session_data): bool
    {
        return true;
    }
}
```

Platine does not ship with a directory to contain your extensions. You are free to place them anywhere you like.

Since the purpose of these methods is not readily understandable, let's quickly cover what each of the methods do:

- The `open` method would typically be used in file based session store systems. Since Platine ships with a `file` session driver, you will rarely need to put anything in this method. You can simply leave this method empty.
- The `close` method, like the `open` method, can also usually be disregarded. For most drivers, it is not needed.
- The `read` method should return the string version of the session data associated with the given `$sessionId`. There is no need to do any serialization or other encoding when retrieving or storing session data in your driver, as Platine will perform the serialization for you.
- The `write` method should write the given `$data` string associated with the `$sessionId` to some persistent storage system, such as MongoDB or another storage system of your choice.  Again, you should not perform any serialization - Platine will have already handled that for you.
- The `destroy` method should remove the data associated with the `$sessionId` from persistent storage.
- The `gc` method should destroy all session data that is older than the given `$lifetime`, which is a UNIX timestamp. For self-expiring systems like Memcached and Redis, this method may be left empty.

#### Registering The Driver

Once your driver has been implemented, you are ready to register it with Platine. To add additional drivers to Platine's session backend, you may use the `boot` method of a service provider. You may do this from the existing `Platine\App\Provider\AppServiceProvider` or create an entirely new provider:

```php
<?php
    /**
     * {@inheritdoc}
     */
    public function register(): void
    {
        $this->app->bind(SessionHandlerInterface::class, function (ContainerInterface $app) {
            return new MySessionDriver();
        });
    }
```

Once the session driver has been registered, you may use the `mydriver` driver in your `config/session.php` configuration file.

```php
<?php
    return [
        //...
    	'driver' => env('PL_APP_SESSION_DRIVER', 'mydriver'),
    	//...
        'storages' => [
            //...
            'mydriver' => [],
        ]

    ];

```

