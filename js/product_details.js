//获取pid
var str=window.location.href;
var pid=str.substr(str.lastIndexOf("=")+1);
//显示商品信息
loadDetails();
function loadDetails() {
    var xhr=new XMLHttpRequest();
    xhr.onreadystatechange=function () {
        if (xhr.readyState==4){
            var res=xhr.responseText;
            res=JSON.parse(res);
            //console.log(res);
            document.getElementById("product_img").src=res.pic;
            document.getElementById("title1").innerHTML=res.title;
            document.getElementById("title2").innerHTML=res.title2;
            document.getElementById("product_info").innerHTML='<li>作者：'+res.author+'</li>' +
                                                        '<li>出版社：'+res.pubhouse+'</li>' +
                                                        '<li>出版时间：'+res.pubtime+'</li>';
            document.getElementById("price").innerHTML='¥ '+res.price;
            document.getElementById("details").innerHTML=res.details;
        }
    }
    xhr.open('GET','php/product_details.php?pid='+pid,true);
    xhr.send(null);
}


 //添加购物车
var addCart=document.getElementById("addCart");
addCart.onclick=function () {
    if (sessionStorage.uid){//已登录
        var xhr=new XMLHttpRequest();
        xhr.onreadystatechange=function () {
            if (xhr.readyState==4){
                var res=xhr.responseText;
                res=JSON.parse(res);
                if (res.code==1){
                    alert("添加成功！");
                }
            }
        }
        xhr.open('GET','php/cart_add.php?pid='+pid,true);
        xhr.send(null);


}else if(confirm('登录后才能加入购物车，现在去登录？')){//未登录
        location.href="login.html";
    }
}