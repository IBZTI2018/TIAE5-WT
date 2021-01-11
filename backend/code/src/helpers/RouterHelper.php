<?php

namespace App\Helper;

use Slim\App;

final class RouterHelper {
  public static function restResource (App $app, string $controller, string $singular, string $p = null) {
    $plural = (is_null($p)) ? "{$singular}s" : $p;

    $app->get("/{$plural}", "App\Controller\\{$controller}:index")->setName("{$singular}:index");
    $app->get("/{$plural}/{{$singular}_id}", "App\Controller\\{$controller}:show")->setName("{$singular}:show");
    $app->post("/{$plural}", "App\Controller\\{$controller}:create")->setName("{$singular}:create");
    $app->put("/{$plural}/{{$singular}_id}", "App\Controller\\{$controller}:update")->setName("{$singular}:update");
    $app->delete("/{$plural}/{{$singular}_id}", "App\Controller\\{$controller}:delete")->setName("{$singular}:delete");
  }
}
