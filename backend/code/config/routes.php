<?php

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use App\Helper\RouterHelper;
use Slim\App;

//

return function (App $app) {
  $app->get('/', 'App\Controller\HomeController:index')->setName('home');

  RouterHelper::restResource($app, 'CityController', 'city', 'cities');
  RouterHelper::restResource($app, 'UserController', 'user');
    
  $app->get('/countries', 'App\Controller\CountryController:countries')->setName('countries');
};
