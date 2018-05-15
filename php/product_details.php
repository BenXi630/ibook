<?php
@$pid=$_REQUEST['pid'] or die('pid required');
require_once 'init.php';

$sql="SELECT*FROM product WHERE pid=$pid";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
if ($row){
    $output=$row;
}
echo json_encode($output);