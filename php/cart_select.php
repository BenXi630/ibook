<?php
require_once "init.php";
$uid=$_SESSION['uid'] or die('uid requred');

$sql = "SELECT cart.cid,cart.productId,cart.count,product.pic,product.title,product.price FROM product,cart WHERE cart.productId=product.pid AND cart.userId=$uid";
$result=mysqli_query($conn,$sql);
$output=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo  json_encode($output);