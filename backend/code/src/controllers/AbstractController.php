<?php

namespace App\Controller;

use PDO;

abstract class AbstractController 
{
    // MySQL Connection
    private $connection;

    public function __construct(PDO $connection) 
    {
        $this->connection = $connection;
    }
}