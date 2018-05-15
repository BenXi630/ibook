<?php
/*加载所有分类*/
require_once 'init.php';
$sql="SELECT * FROM type";
$result=mysqli_query($conn,$sql);
$output=mysqli_fetch_all($result,MYSQLI_ASSOC);

echo json_encode($output);