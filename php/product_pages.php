<?php
require_once 'init.php';
@$type=$_REQUEST['type'] or $type=0;
$pageSize=4;//每页显示的条数

//获取总记录数
if ($type==0){
    $sql="SELECT*FROM product";
}else{
    $sql="SELECT*FROM product WHERE typeId=$type";
}
$result=mysqli_query($conn,$sql);
$totalRecord=mysqli_num_rows($result);//总记录数
$pageCount=ceil($totalRecord/$pageSize);//总页码数
$output['totalRecord']=$totalRecord;
$output['pageCount']=$pageCount;

echo json_encode($output);