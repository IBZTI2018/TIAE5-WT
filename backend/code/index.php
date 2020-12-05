<?php


$data = ["falcon", "sky", "cloud", "orange", "wood", "forest"];

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Content-type:application/json;charset=utf-8');

echo json_encode($data);
