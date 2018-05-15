<?php
/**
 * Created by PhpStorm.
 * User: W
 * Date: 2017/11/14
 * Time: 18:31
 *
 */
require_once 'init.php';


@$uid = $_SESSION['uid'] or die('uid required');
@$pid = $_REQUEST['pid'] or die('pid required');


//判断购物车表中是否已经存在该商品记录
$sql = "SELECT cid FROM cart WHERE userId=$uid AND productId=$pid";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
if($row){//如果已经存在，则数量+1
    $sql = "update cart set count=count+1 where userid=$uid AND productId=$pid";
    if(mysqli_query($conn,$sql)){
        $output['code']=1;
    }else{
        $output['code']=0;
    }
}else{//如果不存在，则添加一条新记录
    $sql = "INSERT INTO cart VALUES(NULL,$uid, $pid,1)";
    if(mysqli_query($conn,$sql)){
        $output['code']=1;
    }else{
        $output['code']=0;
    }


}

echo json_encode($output);
