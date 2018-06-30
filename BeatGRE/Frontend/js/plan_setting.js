(function($){
    $(document).ready(function(){

        $('.collapsible').collapsible({
            accordion : true
        });
        var value = localStorage["user_name"];
        document.getElementById("user_name").innerText=value;

    });


    // document.getElementById("kkk").addEventListener('click', function() {
    //
    // });

})(jQuery); // end of jQuery name space

function planSetting(task, word_batch){

     var user_name = localStorage["user_name"];
        console.log("debug:"+user_name+task+word_batch +task.value+word_batch.value);
        var data = {"user_name":user_name,"task":task.value,"word_batch":word_batch.value};
    console.log("debug2:"+data.user_name+data.task+data.word_batch);
        $.ajax({url:'http://localhost:5222/plan_setting',
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

                alert("更新成功！自动跳转回主页");
                window.location.href = 'userface.html';

            },
            error:function (res) {
                alert("未知错误!");
            }

        })
}