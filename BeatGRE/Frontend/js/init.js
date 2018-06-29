(function($){
  // $(function(){
  //
  //   $('.button-collapse').sideNav();
  //
  // }); // end of document ready

    // $(document).ready(function(){
    //     // $('.collapsible').collapsible();
    //     $('.collapsible').collapsible({
    //         accordion : true
    //     });
    // });

    $('.collapsible').collapsible({
        accordion : true
    });
    let elem = document.querySelectorAll('.collapsible.expandable');


    let instanceCollapsible = M.Collapsible.init(elem, {
        accordion: true,
        onOpenStart: function(){
            console.log('collasible Open Star12t');
        }
    });
})(jQuery); // end of jQuery name space

