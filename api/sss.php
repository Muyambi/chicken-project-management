<?php
 require 'dbconnection.php';

 $sql =  $conn_new->query("SELECT SUM(totalSOLD) as total ,SUM(amount) as amt FROM salestransactions");
$num = mysqli_num_rows($sql);
$rows = mysqli_fetch_all( $sql,MYSQLI_ASSOC);
echo($rows);
exit(json_encode(array('status' => 'success','data' => $rows))); 

mysqli_close($conn_new);

   ?>