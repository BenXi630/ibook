var type=0;
var pageNum=1;
//加载商品类型
loadType();
//加载所有商品
loadProduct();
//加载分页
loadPages();


//加载商品类型函数
function loadType() {
    //创建xhr对象
    var xhr=new XMLHttpRequest();
    //设置状态信息改变后的处理函数
    xhr.onreadystatechange=function () {
        if (xhr.readyState==4){//正常接收到响应了
            var res=xhr.responseText;
            res=JSON.parse(res);
            //构建和添加元素
            var product_type=document.getElementById("product_type");
            var frag=document.createDocumentFragment();
            for (var i=0;i<res.length;i++){
                var a=document.createElement("a");
                a.innerHTML=res[i].tname;
                a.href='#'+res[i].tid;
                frag.appendChild(a);
            }
            product_type.appendChild(frag);
            //为分类绑定事件
            var as=product_type.getElementsByTagName("a");
            for(var i=0;i<as.length;i++){
                as[i].onclick=function () {
                    //改变样式
                    for (var j=0;j<as.length;j++){
                        as[j].className="";
                        this.className="active";
                    }
                    //获取type，重新加载数据
                    type=this.href.substr(this.href.lastIndexOf('#')+1);
                    loadProduct();//加载商品
                    loadPages();//加载分页
                }
            }
        }
    };
    //建立请求连接
    xhr.open('GET','php/type_select.php',true);
    //发送请求
    xhr.send(null);
}


//加载商品函数
function loadProduct() {
    //创建xhr对象
    var xhr=new XMLHttpRequest();
    ////设置状态信息改变后的处理函数
    xhr.onreadystatechange=function () {
        if(xhr.readyState==4){//正常接收到响应了
            var res=xhr.responseText;
            res=JSON.parse(res);
            var product_list=document.getElementById("product_list");
            var htmlStr="";
            for (var i=0;i<res.length;i++){
                htmlStr+='<li>' +
                    '<a href="product_details.html?pid='+res[i].pid+'" class="a_img"><img src="'+res[i].pic+'" alt=""/></a>' +
                    '<a href="product_details.html?pid='+res[i].pid+'" class="a_text">'+res[i].title+'</a>' +
                    '<p>'+res[i].pubhouse+'</p>' +
                    '<strong>¥ '+res[i].price+'</strong>' +
                    '</li>';
            }
            product_list.innerHTML=htmlStr;
        }
    };
    xhr.open('GET','php/product_select.php?type='+type+'&pageNum='+pageNum,true);
    xhr.send(null);
}


//加载分页函数
function loadPages() {
    // 创建XHR对象
    var xhr = new XMLHttpRequest();
    // 设置状态信息改变后的处理函数
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {// 正常接收到响应了
            var res = xhr.responseText;
            res=JSON.parse(res);
            // console.log(res);
            //共有多少商品
            var product_count=document.getElementById("product_count");
            product_count.innerHTML=res.totalRecord;
            //加载分页
            var pageCount=res.pageCount;
            var pages=document.getElementById('pages');
            var pagesHtml='<a href="">上一页</a>';
            for(var i=1;i<=pageCount;i++){
                if(i==1){
                    pagesHtml+='<a href="" class="cur">'+i+'</a>'
                }else{
                    pagesHtml+='<a href="">'+i+'</a>'
                }
            }
            pagesHtml+='<a href="">下一页</a>';
            pages.innerHTML=pagesHtml;
            //点击分页码，切换对应的商品
            var as=pages.getElementsByTagName('a');
            for(var i=0;i<as.length;i++){
                as[i].onclick=function(e){//为页码绑定事件处理函数
                    e.preventDefault();//清除a标记的默认行为
                    var now=this.innerHTML;
                    // console.log(now);
                    if(now=="上一页"){//用户点击的是‘上一页’的时候
                        if(pageNum==1) return;//当前已经是第一页，则跳出函数
                        pageNum--;
                    }else if(now=="下一页"){//用户点击的是'下一页'的时候
                        if(pageNum==pageCount) return;//当前已经是最后一页，则跳出函数
                        pageNum++;
                    }else{//用户点击的是页码的时候
                        pageNum=now;
                    }
                    loadProduct();//重新加载商品
                    //修改页码样式
                    for(var j=0;j<as.length;j++){
                        as[j].className="";
                        as[pageNum].className="cur";
                    }
                }
            }

        }
    };
    // 建立请求连接（并没有发送请求）
    xhr.open('GET', 'php/product_pages.php?type='+type, true);
    // 发送请求
    xhr.send(null);
}