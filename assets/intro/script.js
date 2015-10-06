$(document).ready(function(){
  $('li').on('mouseenter', function(){
    $(this).toggleClass('highlighted');
  });
  $('li').on('mouseleave', function(){
    $(this).toggleClass('highlighted');
  });
});
