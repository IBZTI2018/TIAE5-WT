<?php

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;

return function (App $app) {
    // HomeController
    $app->get('/', 'App\Controller\HomeController:index')->setName('home');

    // AuthController
    $app->post('/auth/register', 'App\Controller\AuthController:register')->setName('register');
    $app->post('/auth/login', 'App\Controller\AuthController:login')->setName('login');
};
