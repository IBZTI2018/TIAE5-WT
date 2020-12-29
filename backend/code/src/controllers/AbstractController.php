<?php

namespace App\Controller;

use PDO;

abstract class AbstractController 
{
    // MySQL Connection
    protected $connection;

    public function __construct(PDO $connection) 
    {
        $this->connection = $connection;
    }

    protected function fetchAll(string $query)
    {
        $statement = $this->connection->prepare($query);
        $statement->execute();
        return $statement->fetchAll();
    }
}