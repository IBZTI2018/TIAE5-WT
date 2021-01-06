<?php

namespace App\Controller;

use PDO;
use Psr\Http\Message\ResponseInterface as Response;

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

    // Generic JSON-API helpers
    protected function normalizeApiModel(array $data, string $type) {
        $output = array();

        foreach ($data as $entry) {
            $model = array();
            $model["id"] = $entry["id"];
            $model["type"] = "$type";
            $model["attributes"] = array();
            $model["links"] = array();
            unset($entry["id"]);

            foreach($entry as $key => $value) {
                if ($this->keyEndsWith($key, "_id")) {
                    $model["links"][$key] = $value;
                } else {
                    $model["attributes"][$key] = $value;
                }
            }

            array_push($output, $model);
        }

        return $output;
    }
    
    private function keyEndsWith($haystack, $needle) { 
        $len = strlen($needle); 
        if ($len == 0) return true; 
        return (substr($haystack, -$len) === $needle); 
    } 

    // Generic JSON-API response formatters
    protected function jsonData(Response $response, int $status, array $data) {
        $response = $response->withStatus($status);
        $response->getBody()->write(json_encode(array("data" => $data)));
        return $response;
    }

    protected function jsonError(Response $response, int $status, array $errors) {
        $response = $response->withStatus($status);
        $response->getBody()->write(json_encode(array("errors" => $errors)));
        return $response;
    }
}