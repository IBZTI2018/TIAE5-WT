<?php

namespace App\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


final class UserController extends AbstractController
{
  public function index(Request $request, Response $response, array $args = []): Response {
    $sql_query = "SELECT * FROM user";
    $query_data = $this->fetchAll($sql_query);
    $api_data = $this->normalizeApiModels($query_data, "user");

    return $this->jsonData($response, 200, $api_data);
  }
  
  public function show(Request $request, Response $response, array $args = []): Response {
    return $response;
  }

  public function create(Request $request, Response $response, array $args = []): Response {
    return $response;
  }

  public function update(Request $request, Response $response, array $args = []): Response {
    return $response;
  }

  public function delete(Request $request, Response $response, array $args = []): Response {
    return $response;
  }
}