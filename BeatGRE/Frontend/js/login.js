// 用户名、密码要求在6字节以上，email的格式验证，并保证用户名和email在系统中唯一。
function checkInfo(user_name_email,password){

    if (user_name_email.value.length==0) {
        alert("嘿，先输入用户名长度!");
        return false;
    }else if (password.value.length<6){
        alert("嘿，别忘输密码!");
        return false;
    } else  return true;
}
//解决要点两次button才响应的问题
// var a=1;
function login(user_name_email, password){


    if (checkInfo(user_name_email,password)==true){
        var data = {"user_name_email":user_name_email.value,"password":password.value};

        $.ajax({url:'http://localhost:5222/login',
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
                console.log("debug"+temp.result+temp.cur_book);
                if (temp.result == "not_exist"){
                    alert("用户名不存在!");
                } else if (temp.result == "wrong_password"){
                    alert("密码错误!");
                } else{
                    alert("登陆成功！欢迎!");
                    if (window.localStorage) {
                        //存储变量的值
                        localStorage.setItem('cur_book',temp.cur_book) ;
                        localStorage.setItem('user_name',user_name_email.value) ;//must add value!!
                        window.location.href = 'userinterface.html';
                    } else {
                        alert("NOT SUPPORT");
                    }


                }


            },
            error:function (res) {
                alert("未知错误!");
            }

        })
        return true;
    }else  return true;
}