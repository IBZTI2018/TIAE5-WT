<?php

namespace App\Controller;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;


final class AuthController
{
	public function register(Request $request, Response $response, array $args = []): Response
	{
		$response_data = $request->getParsedBody();
        $response->getBody()->write(json_encode($response_data));

		return $response;
    }
    public function login(Request $request, Response $response, array $args = []): Response
	{
		$response_data = $request->getParsedBody();
        $response->getBody()->write(json_encode($response_data));

		return $response;
	}
}