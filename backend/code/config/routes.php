<?php

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;

return function (App $app) {
    // HomeController
    $app->get('/', 'App\Controller\HomeController:index')->setName('home');

    // CountryController
    $app->get('/countries', 'App\Controller\CountryController:countries')->setName('countries');
};
