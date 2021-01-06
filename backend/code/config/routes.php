<?php

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;

return function (App $app) {
    // UserController
    $app->get('/users', 'App\Controller\UserController:index')->setName('user:index');
    $app->get('/users/{user_id}', 'App\Controller\UserController:show')->setName('user:show');
    $app->post('/users', 'App\Controller\UserController:create')->setName('user:create');
    $app->put('/users/{user_id}', 'App\Controller\UserController:update')->setName('user:update');
    $app->delete('/users/{user_id}', 'App\Controller\UserController:delete')->setName('user:delete');

    // HomeController
    $app->get('/', 'App\Controller\HomeController:index')->setName('home');

    // CountryController
    $app->get('/countries', 'App\Controller\CountryController:countries')->setName('countries');
};
