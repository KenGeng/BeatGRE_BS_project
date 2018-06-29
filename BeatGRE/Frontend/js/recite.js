(function($){
    $(function(){

        showWord();
    }); // end of document ready
})(jQuery); // end of jQuery name space
function showWord() {

// var dialog = document.querySelector('#dialog_tpl');


    $.ajax({url:'http://localhost:5222/recite',
        processData: false,
        cache:false,
        contentType: "application/json; charset=utf-8",
        // data:data,
        datatype: "json",
        type: 'get',
        success: function (res) {
            console.log(res);
            console.log('dsa');
            var str=  res ;
            var ob=JSON.parse(str) ;
            console.log(ob.result);
            console.log(ob.worddata.wordpatch);
            var batch=ob.worddata.wordpatch;
            // var temp=JSON.parse(res.data);
            // console.log("haha"+temp.wordpatch[0].word);
            for (var i = 0; i < 9; i++) {
                var dialog = document.querySelector('#dialog_tpl');
                dialog.content.getElementById("asd").innerHTML=batch[i].word;
                document.getElementById("kkk").appendChild(dialog.content.cloneNode(true));
            }

        },
        error:function (res) {
            alert("未知错误!");
        }

    })

}