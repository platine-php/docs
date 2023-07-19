---
prev: /usage
next: false
---
# Loader
## Introduction
Platine Config uses configuration via the loader (files, database, memory and more).
The library is released only with one loader `Platine\Config\FileLoader`. In order to use configuration via others types, please see `custom loader` below.
## Custom loader
If you want to load configurations based on others store than files, you can define custom loader.
The only thing to do is to implement `Platine\Config\LoaderInterface`. Take an example of configuration stored in database with table structure below:
```sql
CREATE TABLE `config` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `module` VARCHAR(50) NOT NULL,
    `env` VARCHAR(50) NULL DEFAULT NULL,
    `name` VARCHAR(50) NOT NULL,
    `value` VARCHAR(255) NULL DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
)
ENGINE=InnoDB;
```
The `module` field will be act like a group.
The implementation of the loader:
```php

use PDO;
use PDOException;
use Platine\Config\LoaderInterface;

class PdoLoader implements LoaderInterface
{
    /**
     * 
     * @var PDO
     */
    protected PDO $pdo;
    
    /**
     * 
     * @param PDO $pdo
     */
    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }
    
    /**
     * {@inheritdoc}
     */
    public function load(string $environment, string $group): array
    {
        $params = [$group];
        $sql = 'SELECT name, value FROM config WHERE module = ?';
        if(!empty($environment)){
            $sql .= ' AND env = ?';
            $params[] = $environment;
        }
        try{
            $query = $this->pdo->prepare($sql);
            $query->execute($params);
        } catch (PDOException $ex){
            echo $ex->getMessage();
        }
        $results = $query->fetchAll(PDO::FETCH_OBJ);
        $items = [];
        foreach($results as $row){
            $items[$row->name] = $row->value;
        }
       
        return $items;
    }
}
```

Now we can use it like before.
1. Define loader

```php
<?php
use App\Loader\PdoLoader;
use PDO;


$pdo = new PDO('mysql:host=localhost;port=3306;dbname=db_app', 'root', '', [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);
$pdoLoader = new PdoLoader($pdo);
```

2. Instantiate the configuration

```php
<?php
use Platine\Config\Config;

$cfg = new Config($pdoLoader, '');
```
That is all.