<?php

namespace App\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


final class HomeController 
{
	public function index(Request $request, Response $response, array $args = []): Response
	{
		$response_data = ["falcon", "sky", "cloud", "orange", "wood", "forest"];
        $response->getBody()->write(json_encode($response_data));

		return $response;
	}
}