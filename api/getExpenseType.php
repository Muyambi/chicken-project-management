<?php

 
// import MySQL database connections
require 'dbconnection.php';

//get gender sql database query to check if the member exists
$sql = "select * from expensetypes";
try {
    //execute the query 
    $stmt = mysqli_query($conn_new,$sql);
    if(mysqli_num_rows($stmt) > 0){

       
        $rows = mysqli_fetch_all($stmt,MYSQLI_ASSOC);

        exit(json_encode(array('status' => 'success','data' => $rows))); 
       
          
    }else{
        exit(json_encode(array('status' => 'failed','message' => 'No member record found.')));
    }
} catch (\Throwable $th) {
    exit(json_encode(array('status' => 'error','message' => $th)));
}        
mysqli_close($conn_new);
?>
