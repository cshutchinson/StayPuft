$(document).ready(function(){
  // $('li').on('mouseenter', function(){
  //   $(this).toggleClass('highlighted');
  // });
  // $('li').on('mouseleave', function(){
  //   $(this).toggleClass('highlighted');
  // });
  var subSections = $('.contact, .family, .interests, .about');
  $('li').on('click', '#contact', function(){
    $('#contact, #family, #interests, #about').removeClass('highlighted');

    $(this).addClass('highlighted');
    subSections.hide();
    $('.contact').toggle();
  });
  $('li').on('click', '#family', function(){
    $('#contact, #family, #interests, #about').removeClass('highlighted');

    $(this).addClass('highlighted');
    subSections.hide();
    $('.family').toggle();
  });
  $('li').on('click', '#interests', function(){
    $('#contact, #family, #interests, #about').removeClass('highlighted');

    $(this).addClass('highlighted');
    subSections.hide();
    $('.interests').toggle();
  });
  $('li').on('click', '#about', function(){
    $('#contact, #family, #interests, #about').removeClass('highlighted');
    $(this).addClass('highlighted');
    subSections.hide();
    $('.about').toggle();
  });

});
