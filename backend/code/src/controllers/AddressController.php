<?php

namespace App\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


final class AddressController extends AbstractController
{
  public function index(Request $request, Response $response, array $args = []): Response {
    $query = "SELECT * FROM address";
    $data = $this->fetchAll($query);
    $data = $this->normalizeApiModels($data, "address");

    return $this->jsonData($response, 200, $data);
  }
  
  public function show(Request $request, Response $response, array $args = []): Response {
    $query = "SELECT * FROM address WHERE id = ?";
    $data = $this->fetchSingle($query, array($args['address_id']));

    if (is_array($data)) {
      $data = $this->normalizeApiModel($data, "address");
      return $this->jsonData($response, 200, $data);
    } else {
      return $this->jsonData($response, 404, array("errors" => array("title" => "not found")));
    }
  }

  public function create(Request $request, Response $response, array $args = []): Response {
    try {
      $query = "INSERT INTO address (street_id, housenumber, inactive_address) VALUES (?,?,?)";
      $id = $this->insertSingle($query, $this->getArgs($request->getParsedBody(), array('street_id', 'housenumber', 'inactive_address')));
    } catch (\Exception $e) {
      return $this->jsonData($response, 400, array("errors" => array("title" => $e->getMessage())));
    }

    $query = "SELECT * FROM address WHERE id = ?";
    $data = $this->fetchSingle($query, array($id));
    $data = $this->normalizeApiModel($data, "address");

    return $this->jsonData($response, 201, $data);
  }

  public function update(Request $request, Response $response, array $args = []): Response {
    try {
      $this->updateSingle('address', $request->getParsedBody(), $args['address_id']);
    } catch (\Exception $e) {
      return $this->jsonData($response, 400, array("errors" => array("title" => $e->getMessage())));
    }

    return $this->show($request, $response, $args);
  }

  public function delete(Request $request, Response $response, array $args = []): Response {
    try {
      $query = "DELETE FROM address WHERE id = ?";
      $ok = $this->deleteSingle($query, array($args['address_id']));
    } catch (\Exception $e) {
      return $this->jsonData($response, 400, array("errors" => array("title" => $e->getMessage())));
    }

    return $this->jsonData($response, 200, array("data" => array("success" => $ok)));
  }
}
