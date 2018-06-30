(function($){
    $(document).ready(function(){

        $('.collapsible').collapsible({
            accordion : true
        });
        showWord();
        var value = localStorage["user_name"];
        document.getElementById("user_name").innerText=value;
        document.getElementById("test_counter").innerText=localStorage.test_counter;
        if (localStorage.test_counter>0) document.getElementById("test_percent").innerText=(Number(localStorage.test_right)/Number(localStorage.test_counter)).toFixed(2);
        else document.getElementById("test_percent").innerText='0';


    });


    // document.getElementById("kkk").addEventListener('click', function() {
    //
    // });

})(jQuery); // end of jQuery name space
function showWord() {

    $.ajax({
        url:'http://localhost:5222/test',
        processData: false,
        cache:false,
        contentType: "application/json; charset=utf-8",
        data:'&'+localStorage["user_name"],
        datatype: "json",
        type: 'get',
        success: function (res) {
            console.log(res);
            console.log('dsa');
            var str=  res ;
            var ob=JSON.parse(str) ;
            console.log(ob.wordbatch);


            var seed = Math.random();//0-1
            var choice =0;
            if (seed<0.25) choice=0;
            else if (seed<0.5) choice=1;
            else if (seed<0.75) choice=2;
            else  choice=3;
            console.log('choice='+ob.wordbatch[choice].translation);
            // console.log('choice='+document.getElementById('itemheader').innerText);
            document.getElementById('itemheader').children[0].innerHTML='<h6>'+ob.wordbatch[choice].translation +'</h6>';
            document.getElementById('itemheader').children[1].children[0].innerHTML="answer : " +ob.wordbatch[choice].word;
            var answer  = ob.wordbatch[choice].word;
            for (var i = 1; i < 5; i++) {
                document.getElementById('item'+i).children[0].innerHTML=ob.wordbatch[i-1].word;
                if (ob.wordbatch[i-1].word==answer) {
                    document.getElementById('item'+i).children[1].children[0].innerHTML='<i class="material-icons">check</i>';
                    // 设置只响应一次
                    var flag=0;
                    document.getElementById('item'+i).addEventListener('click',function () {if (flag==0) {
                        localStorage.test_right = Number(localStorage.test_right)+1;
                        flag=1;
                    }});
                }
                else document.getElementById('item'+i).children[1].children[0].innerHTML="<i class=\"material-icons\">clear</i>";

            }


        },
        error:function (res) {
            alert("未知错误!");
        }

    })

}
function nextpage() {
    if (localStorage.getItem("has_done")<Number(localStorage.getItem("task"))-Number(localStorage.getItem("word_batch"))){
        var new_value =Number(localStorage.getItem("has_done"))+Number(localStorage.getItem("word_batch"));
        localStorage.setItem('has_done',new_value);
        // alert(localStorage.has_done);
        console.log("hasdone:"+localStorage.has_done);
        $.ajax({url:'http://localhost:5222/recite/nextpage',
            processData: false,
            cache:false,
            contentType: "application/json; charset=utf-8",
            data:'&'+localStorage["user_name"],
            datatype: "json",
            type: 'get',
            success: function (res) {
                // var str=  res ;
                // var ob=JSON.parse(str) ;
                window.location.reload();
            },
            error:function (res) {
                alert("未知错误!");
            }

        })
    } else {
        console.log("hasdone:"+localStorage.has_done);
        alert("您已完成今天的任务，休息一下吧 嘿嘿~");
    }



}
function addscore() {



}
