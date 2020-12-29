<?php

namespace App\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


final class CountryController extends AbstractController
{
	public function countries(Request $request, Response $response, array $args = []): Response
	{
        $sql_query = "SELECT isocode, countryname FROM country";
        $query_data = $this->fetchAll($sql_query);
        $response->getBody()->write(json_encode($query_data));

		return $response;
	}
}