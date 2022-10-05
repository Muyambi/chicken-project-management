<?php


$server_name = "127.0.0.1";
$user_name = "thomas";
$password = "1234";
$dbName = "project_management";


// $server_name = "50.116.4.149";
// $user_name = "root";
// $password = "123456789";
// $dbName = "ruzhowa";
$port = "3306";


//$conn = mysqli_connect($server_name,$user_name,$password,$dbName);
$conn_new = mysqli_connect($server_name,$user_name,$password,$dbName,$port);

// if(!$conn_new){
//     echo "Connection failed : " . mysqli_connect_error();
//     exit();
// }
// $conn_new = new mysqli($host,$username,$pass,$db);

// Check connection
if ($conn_new->connect_error) {
  die("Connection failed: " . $conn_new->connect_error);
}