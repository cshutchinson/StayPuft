$(document).ready(function(){
  // mouse movement interactions
  $('li').on('mouseenter', function(){
    $(this).toggleClass('highlighted');
  });
  $('li').on('mouseleave', function(){
    $(this).toggleClass('highlighted');
  });
  // click interactions for main navbar
  var subSections = $('.contact, .family, .interests, .about, .intro');
  $('li').on('click', '#about', function(){
    $('#contact, #family, #interests, #about').removeClass('highlighted');
    $(this).addClass('highlighted');
    subSections.hide();
    $('.about').toggle();
  });
  $('li').on('click', '#family', function(){
    $('#contact, #family, #interests, #about').removeClass('highlighted');
    $(this).addClass('highlighted');
    subSections.hide();
    $('.family').fadeToggle();
  });
  $('li').on('click', '#interests', function(){
    $('#contact, #family, #interests, #about').removeClass('highlighted');
    $(this).addClass('highlighted');
    subSections.hide();
    $('.interests').toggle();
  });
  $('li').on('click', '#contact', function(){
    $('#contact, #family, #interests, #about').removeClass('highlighted');
    $(this).addClass('highlighted');
    subSections.hide();
    $('.contact').toggle();
  });
});
