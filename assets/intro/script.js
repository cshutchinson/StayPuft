$(document).ready(function(){
  // mouse movement interactions
  $('li').on('mouseenter', function(){
    $(this).toggleClass('highlighted');
  });
  $('li').on('mouseleave', function(){
    $(this).toggleClass('highlighted');
  });
  // click interactions for main navbar
  var subSections = $('.contact, .family, .interests, .about, .intro, .page2');
  var ids = $('#contact, #family, #interests, #about, #intro, #page2');
  $('li').on('click', '#about', function(){
    ids.removeClass('highlighted');
    $(this).addClass('highlighted');
    subSections.hide();
    $('.about').toggle();
  });
  $('li').on('click', '#family', function(){
    ids.removeClass('highlighted');
    $(this).addClass('highlighted');
    subSections.hide();
    $('.family').fadeToggle();
  });
  $('li').on('click', '#interests', function(){
    ids.removeClass('highlighted');
    $(this).addClass('highlighted');
    subSections.hide();
    $('.interests').toggle();
  });
  $('li').on('click', '#contact', function(){
    ids.removeClass('highlighted');
    $(this).addClass('highlighted');
    subSections.hide();
    $('.contact').toggle();
  });
  $('li').on('click', '#page2', function(){
    ids.removeClass('highlighted');
    $(this).addClass('highlighted');
    subSections.hide();
    $('.page2').toggle();
  });
});
