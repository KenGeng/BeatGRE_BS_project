// 用户名、密码要求在6字节以上，email的格式验证，并保证用户名和email在系统中唯一。
function checkInfo(username,password,email){
    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
    if (username.value.length<6) {
        alert("嘿，用户名长度要大于6位!");
        return false;
    }else if (password.value.length<6){
        alert("嘿，密码长度要大于6位!");
        return false;
    } else if (email.value.length==0){
        alert("嘿，邮箱不能为空!");
        return false;
    } else if (!reg.test(email.value)){
        alert("邮箱格式不对哦!");
        return false;
    } else  return true;
}
//解决要点两次button才响应的问题
var a=1;
function register(username, password, email){


        var e=document.getElementById("register-button1");

        if(a==1){
            e.style.display="block";
            a=0;
        } else {
            e.style.display="none";
            a=1;
        }
    if (checkInfo(username,password,email)==true){
        alert('select_link clicked');
        // var username = $("#username").val();
        // var password = $("#password").val();
        // var email = $("#email").val();

        var data = {"username":username.value,"password":password.value,"email":email.value};

        console.log("ddd"+data.toString());



        //method 1: only use url
        // $.ajax({
        //
        //
        //     data: document.getElementById("username").value+"&"+document.getElementById("password").value+"&"+document.getElementById("email").value,
        //     url: 'http://127.0.0.1:5222/register',
        //
        //     async:false,
        //     dataType: "jsonp",
        //     // contentType: "application/json; charset=utf-8",
        //     jsonp: "callback",
        //     jsonpCallback: "success_callback",
        //
        //     success: function(data,status){
        //         alert(">"+data);
        //         console.log('success');
        //         console.log("duck"+JSON.stringify(data));
        //         location.href = 'home.html';
        //     },
        //     error: function(data,err){
        //         alert("sad"+JSON.stringify(data)+"..."+data);
        //         console.log("duck"+JSON.stringify(data));
        //         console.log("well");
        //         location.href = 'register.html';
        //     }
        // });
        //method 1: 一般的跨域方法

        $.ajax({url:'http://localhost:5222/register',
            processData: false,
            cache:false,
            contentType: "application/json; charset=utf-8",
            //contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            // data:{page:1,pageSize:10,classify_id:77},
            data:JSON.stringify(data),
            datatype: "json",
            type: 'post',
            success: function (res) {
                console.log(res);
                var temp=JSON.parse(res);
                console.log(temp.error);

                alert("注册成功！现在请使用刚才注册的账户登陆!");
                window.location.href = 'home.html';

            },
            // duplicate_name: function (res) {
            //     console.log(res)
            //     alert("用户名重复，换个名字吧!");
            //     //window.location.href = 'home.html';
            // },
            // duplicate_email:function (res) {
            //     console.log(res)
            //     alert("该邮箱已注册!");
            //     //window.location.href = 'home.html';
            // },
            error:function (res) {
                console.log(res);
                var temp=JSON.parse(res);
                console.log(temp.error);
                if (temp.error == "duplicate_name"){
                    alert("用户名重复，换个名字吧!");
                }
                else if (temp.error == "duplicate_email"){
                    alert("该邮箱已注册!");
                }
                else alert("未知错误!");
            }

        })
        return true;
    }else  return true;
}