<?php
// import MySQL database connections

$request = file_get_contents("php://input");

$main_data = json_decode($request, true);

$function_type = $main_data['function_type'];
//$ruzhowa_id = $main_data['ruzhowa_id'];
$prolo_data = $main_data['pro_data'];

function getProfit(){

    require 'dbconnection';
      
    
    try {
    $sql =  $conn_new->query("SELECT SUM(totalSOLD) as total ,SUM(amount) as amt FROM salestransactions where batchNumber ='$bNum'");

    if(mysqli_num_rows($sql) > 0){
  
   $rows = mysqli_fetch_all( $sql,MYSQLI_ASSOC);
  
   exit(json_encode(array('status' => 'success','data' => $rows))); 
    }
    else{
        exit(json_encode(array('status' => 'failed','message' => 'No member record found.')));
    }
    } catch (\Throwable $th) {
        exit(json_encode(array('status' => 'error','message' => $th)));
    }       
    
    mysqli_close($conn_new);
    }


    



?>