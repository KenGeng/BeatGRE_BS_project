(function($){
    $(document).ready(function(){

        $('.collapsible').collapsible({
            accordion : true
        });
        showWord();
        var value = localStorage["user_name"];
        document.getElementById("user_name").innerText=value;

    });

})(jQuery); // end of jQuery name space
function showWord() {

    $.ajax({url:'http://localhost:5222/review',
        processData: false,
        cache:false,
        contentType: "application/json; charset=utf-8",
        data:'&'+localStorage["user_name"],
        datatype: "json",
        type: 'get',
        success: function (res) {
            console.log(res);
            var str=  res ;
            var ob=JSON.parse(str) ;
            console.log(ob.result);
            console.log(ob.worddata.wordbatch);
            var batch=ob.worddata.wordbatch;
            console.log(ob.word_batch);
            console.log(ob.task);
            localStorage.setItem('word_batch',ob.word_batch);
            localStorage.setItem('task',ob.task);

            for (var i = 0; i < batch.length; i++) {

                var singleline = document.querySelector("#word_expandable");
                singleline.content.getElementById("word_content").innerText=batch[i].word;
                singleline.content.getElementById("translation_content").innerText=batch[i].translation;
                document.getElementById("kkk").appendChild(singleline.content.cloneNode(true));
            }
            $('.collapsible').collapsible();//一行代码 花了7个小时 哎
            for (var i = 0; i < batch.length; i++) {
                document.getElementById("kkk").children[3+i].querySelector('input').addEventListener('click',function () {
                    var word = this.parentElement.parentElement.children[0].children.namedItem("word_content").innerHTML;
                    var trans = this.parentElement.parentElement.children[1].children.namedItem("translation_content").innerHTML;
                    alert(trans);
                    $.ajax({url:'http://localhost:5222/diyword/add',
                        processData: false,
                        cache:false,
                        contentType: "charset=utf-8",
                        data:'&'+localStorage["user_name"]+'&'+word+'&'+trans,
                        datatype: "json",
                        type: 'get',
                        success: function (res) {

                        },
                        error:function (res) {
                            alert("未知错误!");
                        }

                    })

                });
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
        alert(localStorage.has_done);
        console.log("hasdone:"+localStorage.has_done);
        $.ajax({url:'http://localhost:5222/review/nextpage',
            processData: false,
            cache:false,
            contentType: "application/json; charset=utf-8",
            data:'&'+localStorage["user_name"],
            datatype: "json",
            type: 'get',
            success: function (res) {
                window.location.reload();
            },
            error:function (res) {
                alert("未知错误!");
            }

        })
    } else {
        console.log("hasdone:"+localStorage.has_done);
        alert("复习完毕，休息一下吧 嘿嘿~");
    }



}
function backpage() {
    if (localStorage.getItem("has_done")>0){
        var new_value =Number(localStorage.getItem("has_done"))-Number(localStorage.getItem("word_batch"));
        localStorage.setItem('has_done',new_value);
        $.ajax({url:'http://localhost:5222/review/backpage',
            processData: false,
            cache:false,
            contentType: "application/json; charset=utf-8",
            data:'&'+localStorage["user_name"],
            datatype: "json",
            type: 'get',
            success: function (res) {
                window.location.reload();
            },
            error:function (res) {
                alert("未知错误!");
            }

        })
    }else{
        console.log("hasdone:"+localStorage.getItem("has_done"));
        alert("不能再向前啦 嘿嘿~");
    }


}
