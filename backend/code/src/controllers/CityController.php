<?php

namespace App\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


final class CityController extends AbstractController
{
  public function index(Request $request, Response $response, array $args = []): Response {
    $query = "SELECT * FROM city";
    $data = $this->fetchAll($query);
    $data = $this->normalizeApiModels($data, "city");

    return $this->jsonData($response, 200, $data);
  }
  
  public function show(Request $request, Response $response, array $args = []): Response {
    $query = "SELECT * FROM city WHERE id = ?";
    $data = $this->fetchSingle($query, array($args['city_id']));

    if (is_array($data)) {
      $data = $this->normalizeApiModel($data, "city");
      return $this->jsonData($response, 200, $data);
    } else {
      return $this->jsonData($response, 404, array("errors" => array("title" => "not found")));
    }
  }

  public function create(Request $request, Response $response, array $args = []): Response {
    try {
      $query = "INSERT INTO city (isocode, postcode, cityname) VALUES (?,?,?)";
      $id = $this->insertSingle($query, $this->getArgs($request->getParsedBody(), array('isocode', 'postcode', 'cityname')));
    } catch (\Exception $e) {
      return $this->jsonData($response, 400, array("errors" => array("title" => $e->getMessage())));
    }

    $query = "SELECT * FROM city WHERE id = ?";
    $data = $this->fetchSingle($query, array($id));
    $data = $this->normalizeApiModel($data, "city");

    return $this->jsonData($response, 201, $data);
  }

  public function update(Request $request, Response $response, array $args = []): Response {
    try {
      $this->updateSingle('city', $request->getParsedBody(), $args['city_id']);
    } catch (\Exception $e) {
      return $this->jsonData($response, 400, array("errors" => array("title" => $e->getMessage())));
    }

    return $this->show($request, $response, $args);
  }

  public function delete(Request $request, Response $response, array $args = []): Response {
    try {
      $query = "DELETE FROM city WHERE id = ?";
      $ok = $this->deleteSingle($query, array($args['city_id']));
    } catch (\Exception $e) {
      return $this->jsonData($response, 400, array("errors" => array("title" => $e->getMessage())));
    }

    return $this->jsonData($response, 200, array("data" => array("success" => $ok)));
  }
}
