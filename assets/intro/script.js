$(document).ready(function(){
  $('div').on('click', function(){
    $(this).toggleClass('hidden hide-text');
    if ($('.hidden').length === 4){
      $('div').animate({'margin': '0px'}, 100);
      $('div').animate({'border-width': '0px'}, 50);
    } else {
      $('div').animate({'margin': '10px'}, 100);
      $('div').animate({'border-width': '5px'}, 50);
    }
  });
});
