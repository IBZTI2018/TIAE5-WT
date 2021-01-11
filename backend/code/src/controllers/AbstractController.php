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
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    // MySQL Helpers
    protected function fetchAll(string $query)
    {
        $statement = $this->connection->prepare($query);
        $statement->execute();
        return $statement->fetchAll();
    }

    protected function fetchSingle(string $query, array $params) {
        $statement = $this->connection->prepare($query);
        $statement->execute($params);
        return $statement->fetch();
    }

    protected function insertSingle(string $query, array $params) {
        $statement = $this->connection->prepare($query);
        $statement->execute($params);
        return $this->connection->lastInsertId();
    }

    protected function deleteSingle(string $query, array $params) {
        $statement = $this->connection->prepare($query);
        return $statement->execute($params);
    }

    protected function updateSingle(string $table, array $params, string $id) {
        $query = "UPDATE $table SET ";

        $mapper = function($key) { return " $key = ? "; };

        $keys = array_keys($params);
        $parm = array_map($mapper, $keys);

        $query = $query . implode(", ", $parm);
        $query = $query . " WHERE id = ?";

        $replace = array();
        foreach ($params as $param) {
            array_push($replace, $param);
        }

        array_push($replace, $id);

        $statement = $this->connection->prepare($query);
        return $statement->execute($replace);
    }

    // Generic input helpers
    protected function getArgs(array $args, array $keys) {
        $output = array();

        foreach ($keys as $key) {
            array_push($output, $args[$key] ?? null);
        }

        return $output;
    }

    // Generic JSON-API helpers
    protected function normalizeApiModel(array $data, string $type) {
        return $this->normalizeApiModels(array($data), $type);
    }

    protected function normalizeApiModels(array $data, string $type) {
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