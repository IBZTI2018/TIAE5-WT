<?php

namespace App\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


final class HomeController extends AbstractController
{
	public function index(Request $request, Response $response, array $args = []): Response
	{
        $response->getBody()->write(json_encode(['success' => true]));
		return $response;
	}
}