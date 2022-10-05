<?php
require 'dbconnection.php';
$request = file_get_contents("php://input");

$main_data = json_decode($request,true);

$function_type = $main_data['function_type'];
$expense_data = $main_data['expense_data'];    
 
    
    $name= $expense_data['name'];
    $amount=$expense_data['amount'];
    $expenseDate = date("Y-m-d H:i:s"); 
    $expenseType=$expense_data['type'];
    $year = date("Y");
    $breed = $expense_data['breed'];
    $chicks=$expense_data['Cnumber'];
    
  
    $sql = "INSERT INTO expenses(expenseName,amount,expenseType,createdAt) VALUES ('$name','$amount','$expenseType','$expenseDate') ";
   
    
    try {
       $conn_new->query($sql);
       
        if($conn_new->error) {
            exit(json_encode(array('status' => 'error','message' => $conn_new->error)));
         }
       

         $id = $conn_new->insert_id;
         //echo $id;
        
         if($id<10){
             $expID = 'EXP' . $id.'--'.$year;
         }
         if($id<=100 && $id>=10){
            $expID = 'EXP0' . $id.'--'.$year;
        } 
        if($id<=1000 && $id>=100){
            $expID = 'EXP00' . $id.'--'.$year;
        }
        if($id<10000 && $id>=1000  ){
            $expID = 'EXP000' . $id.'--'.$year;
        }
        
        
         $sql1="UPDATE  expenses set expenseID = '$expID' where ID = '$id'";
      
      $conn_new->query($sql1);
       
         if($conn_new->error) {
             exit(json_encode(array('status' => 'error','message' => $conn_new->error)));
          }
          if($expenseType==1){
          expenseTypeSelect($expense_data);
          }
      
         exit(json_encode(array('status' => 'success')));
       
    } catch (\Throwable $th2) {
        exit(json_encode(array('status' => 'error','message' => $th2)));
    }    
    mysqli_close($conn_new);  



 
  function expenseTypeSelect(&$expense_data){
      require 'dbconnection.php';

        $breed = $expense_data['breed'];
        $chicks=$expense_data['Cnumber'];
  
    

      try{
         
            $sql2= "INSERT INTO batches(Breed,chicksBought) VALUES ('$breed','$chicks')";

            $conn_new->query($sql2);

            if($conn_new->error) {
               exit(json_encode(array('status' => 'error','message' => $conn_new->error)));
            }

            $id = $conn_new->insert_id;
            if($id<10){
              $batchID= 'BATCH' . $id;
            }
            if($id<=100 && $id>=10){
              $batchID = 'BATCH0' . $id;
           } 
           if($id<=1000 && $id>=100){
              $batchID = 'BATCH00' . $id;
           }
           if($id<10000 && $id>=1000  ){
              $batchID = 'BATCH000' . $id;
           }
  
            $sql3="UPDATE batches set BatchID = '$batchID' where id = '$id'";
  
            $conn_new->query($sql3);
         
            if($conn_new->error) {
                exit(json_encode(array('status' => 'error','message' => $conn_new->error)));
  
             }
  
  
            $sql4 = "INSERT INTO sales(BatchID,chicksBought) VALUES ('$batchID','$chicks')";
  
            $conn_new->query($sql4);
         
            if($conn_new->error) {
                exit(json_encode(array('status' => 'error','message' => $conn_new->error)));
             }
          
          exit(json_encode(array('status' => 'success')));
      }
   catch (\Throwable $th2) {
        exit(json_encode(array('status' => 'error','message' => $th2)));
    }    
    mysqli_close($conn_new);  
 

  }


?>
