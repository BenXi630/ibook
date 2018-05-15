//判断用户是否登录
if(sessionStorage.uid){
    loadCart();//请求购物车商品数据
}

function loadCart(){
    // 创建XHR对象
    var xhr = new XMLHttpRequest();
    // 设置状态信息改变后的处理函数
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {// 正常接收到响应了
            var res = xhr.responseText;
            res=JSON.parse(res);
            console.log(res);
            var cartcon_list = document.getElementById('cartcon_list');
            if(res.length==0){//购物车为空
                cartcon_list.innerHTML='<h2>购物车中没有任何商品！<a href="product_list.html">查看全部商品</a></h2>';
            }else{//显示购物车商品列表
                var cartHtml='<ul>';
                var count=0;//总数量
                var priceSum=0;//总金额
                for(var i=0;i<res.length;i++){
                    cartHtml+='<li class="clearfloat">'
                        +'<span><input type="checkbox" class="cart_checkbox"/></span>'
                        +'<a href="product_details.html?pid='+res[i].productId+'" class="cart_img"><img src="'+res[i].pic+'" alt=""/></a>'
                        +'<a href="product_details.html?pid='+res[i].productId+'" class="cart_title">'+res[i].title+'</a>'
                        +'<i>¥'+res[i].price+'</i>'
                        +'<div>'
                        +'<span>-</span><input type="text" value="'+res[i].count+'"/><span>+</span>'
                        +'</div>'
                        +'<strong>¥'+(res[i].price*res[i].count).toFixed(2)+'</strong>'
                        +'<em></em>'
                        +'</li>';
                    count+=parseInt(res[i].count);
                    priceSum+=res[i].price*res[i].count;
                }
                cartHtml+='</ul>';
                cartcon_list.innerHTML=cartHtml;
                document.getElementById('cSum').innerHTML=count;//修改总数
                document.getElementById('pSum').innerHTML=priceSum.toFixed(2);//修改总金额

            }
        }
    };
    // 建立请求连接（并没有发送请求）
    xhr.open('GET', 'php/cart_select.php', true);
    // 发送请求
    xhr.send(null);
}
