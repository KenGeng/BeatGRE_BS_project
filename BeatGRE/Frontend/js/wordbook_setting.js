(function($){
    $(document).ready(function(){

        $('.collapsible').collapsible({
            accordion : true
        });
        var value = localStorage["user_name"];
        document.getElementById("user_name").innerText=value;
        document.getElementById("cur_book").innerText=localStorage.cur_book;

    });


    // document.getElementById("kkk").addEventListener('click', function() {
    //
    // });

})(jQuery); // end of jQuery name space

function wordbookSetting(wordbook_id){

     var user_name = localStorage["user_name"];

        var data = {"user_name":user_name,"book_id":wordbook_id.value};

    console.log("debug2:"+data.user_name+data.book_id);
        $.ajax({url:'http://localhost:5222/wordbook_setting',
            processData: false,
            cache:false,
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify(data),
            datatype: "json",
            type: 'post',
            success: function (res) {
                console.log(res);
                var temp=JSON.parse(res);
                console.log(temp.result);
                localStorage.cur_book = wordbook_id.value;
                alert("更新成功！自动跳转回主页");
                window.location.href = 'userface.html';

            },
            error:function (res) {
                alert("未知错误!");
            }

        })
}