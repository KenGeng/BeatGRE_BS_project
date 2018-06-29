(function($){
    $(document).ready(function(){

        $('.collapsible').collapsible({
            accordion : true
        });
        showWord();
        var value = localStorage["user_name"];
        document.getElementById("user_name").innerText=value;
    });

    // document.addEventListener('DOMContentLoaded', function() {
    //     // showWord();
    // });

})(jQuery); // end of jQuery name space
function showWord() {

    $.ajax({url:'http://localhost:5222/recite',
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
            console.log(ob.result);
            console.log(ob.worddata.wordbatch);
            var batch=ob.worddata.wordbatch;

            // var dialog = document.querySelector('#kkk');
            for (var i = 0; i < 10; i++) {

                // var inhtml ='<ul class="collapsible expandable">';
                // inhtml+='<li class>';
                // inhtml+='<div class="collapsible-header">';
                // inhtml+='<i class="material-icons">filter_drama</i>';
                // inhtml+='<span id="word_content">123</span>';
                // inhtml+='<span class="badge light-green-text">check</span>';
                // inhtml+='</div>';
                // // style="display: block;"
                // inhtml+='<div class="collapsible-body " ><p>Lorem ipsum dolor sit amet.</p></div>';
                // inhtml+='</li>';
                // inhtml+=' </ul>';
                //
                // dialog.innerHTML+=inhtml;

                // dialog.content.getElementById("word_content").innerHTML=batch[i].word;
               // dialog.content.getElementById("translation").innerHTML=batch[i].translation;
                var singleline = document.querySelector("#word_expandable");
                singleline.content.getElementById("word_content").innerText=batch[i].word;
                singleline.content.getElementById("translation_content").innerText=batch[i].translation;
                document.getElementById("kkk").appendChild(singleline.content.cloneNode(true));
            }
            $('.collapsible').collapsible();//一行代码 花了7个小时 哎

        },
        error:function (res) {
            alert("未知错误!");
        }

    })

}