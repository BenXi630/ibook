<?php
/*注销用户*/
require('init.php');

//清除session
$_SESSION = [];
session_destroy();
