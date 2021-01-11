<?php

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use App\Helper\RouterHelper;
use Slim\App;

//

return function (App $app) {
    
    RouterHelper::restResource($app, 'UserController', 'user', 'users');

    // HomeController
    $app->get('/', 'App\Controller\HomeController:index')->setName('home');

    // CountryController
    $app->get('/countries', 'App\Controller\CountryController:countries')->setName('countries');
};
