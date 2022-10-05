<?php


// import MySQL database connections

$request = file_get_contents("php://input");

$main_data = json_decode($request, true);

$function_type = $main_data['function_type'];
//$ruzhowa_id = $main_data['ruzhowa_id'];
$sale_data = $main_data['sale_data'];

if($function_type == 'createsale'){
   createNewSale();
}
if($function_type == 'getsales'){
   getBatchData();
}
if($function_type == 'getsalesT'){
    getSalesTransaction();
 }
if($function_type=='getbatchS'){
    getBatchSum($sale_data);
}
if($function_type=='savebatchS'){
    saveBatchData($sale_data);
}
if($function_type=='getbatchE')
{
    getBatchExpenseSum($sale_data);
}


function createNewSale(){
    require 'dbconnection.php';
    $amt = $sale_data['amtSold'];
    $total = $sale_data['numSold'];
    date("Y-m-d H:i:s");
   
    $sql = "INSERT INTO salestransactions(totalSold,amount,createdAt) values ('$total','$amt','$date')";

    try {
        $conn_new->query($sql);

        if($conn_new->error){
            exit(json_encode(array('status' => 'error','message' => $conn_new->error))); 
        }
        exit(json_encode(array('status' => 'success')));
       
    } catch (\Throwable $th2) {
        exit(json_encode(array('status' => 'error','message' => $th2)));
    }    
    mysqli_close($conn_new); 
     
  }

  function getBatchData(){
      require 'dbconnection.php';
      $sql = "select * from sales";
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



  }

  function getSalesTransaction(){
    require 'dbconnection.php';
    $sql = "select * from salestransactions";
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
  
}
function getBatchSum(&$sale_data){

    require 'dbconnection.php';   

    
    $bNum=$sale_data['batchNum'];
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
function getBatchExpenseSum(&$sale_data){

    require 'dbconnection.php';   

    
    $bNum=$sale_data['batchNum'];
    try {
    $sql =  $conn_new->query("SELECT ,SUM(amount) as amount FROM salestransactions where BatchID ='$bNum'");

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

function getBatchESum(&$sale_data){

    require 'dbconnection.php';   

    
    $bNum=$sale_data['batchNum'];
    try {
    $sql =  $conn_new->query("SELECT SUM(amount) as amt FROM expenses where BatchID ='$bNum'");

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

   
function  saveBatchData(&$sale_data){
    require 'dbconnection.php';
    $totalAmt = $sale_data['totalSalesAmt'];
    $totalValue=$sale_data['totalSales'];
    $totalExpense=$sale_data['totalExpense'];
    $bNum=$sale_data['batchNum'];
    $createdAT=date("Y-m-d H:i:s");

    $sql ="UPDATE sales SET chicksSold ='$totalValue',salesAmtValue='$totalAmt',dateCreated='$createdAT' WHERE BatchID='$bNum'";
    $sql1="INSERT into profitorloss(batch,date,sales,expenses) values('$batch','$createdAT','$totalAmt','$totalExpense')";
    
try{
    $conn_new->query($sql);

        if($conn_new->error){
            exit(json_encode(array('status' => 'error','message' => $conn_new->error))); 
        }

        $conn_new->query($sql1);

        if($conn_new->error){
            exit(json_encode(array('status' => 'error','message' => $conn_new->error))); 
        }

        $value = $totalAmt-$totalExpense;

        if($value>0){
            $sql2 = "UPDATE profitorloss SET profit='$value' where BatchID = '$bNum'";
        }
        if($value<=0){
            $sql2 = "UPDATE profitorloss SET loss='$value' where BatchID = '$bNum'";

        }

        $conn_new->query($sql2);

        if($conn_new->error){
            exit(json_encode(array('status' => 'error','message' => $conn_new->error))); 
        }

        exit(json_encode(array('status' => 'success')));
       
    } catch (\Throwable $th2) {
        exit(json_encode(array('status' => 'error','message' => $th2)));
    }    
    mysqli_close($conn_new); 

}

 
?>
