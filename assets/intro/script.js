
$(document).ready(function(){

  $.data( document.body, "panel", 0 );
  $('li').on('mouseenter', function(){
    $(this).toggleClass('highlighted');
  });
  $('li').on('mouseleave', function(){
    $(this).toggleClass('highlighted');
  });
  // click interactions for main navbar
  var subSections = $('.contact, .family, .interests, .about, .intro, .page2');
  var ids = $('#contact, #family, #interests, #about, #intro, #page2');



  $('li').on('click', '#page2', function(){
    ids.removeClass('highlighted');
    $(this).addClass('highlighted');
    subSections.hide();
    $('.page2').toggle();
  });
  $('#home').on('click', function(){
    subSections.hide();
    $('.intro').toggle();
  });
  $('.rightNav').on('mouseenter', function(){
    $(this).addClass('nav-hover');
  });
  $('.rightNav').on('mouseleave', function(){
    $(this).removeClass('nav-hover');
  });
  $('.leftNav').on('mouseenter', function(){
    $(this).addClass('nav-hover');
  });
  $('.leftNav').on('mouseleave', function(){
    $(this).removeClass('nav-hover');
  });


  $('.leftNav').on('click', function(){
    subSections.hide();
    changePanel(-1);
    switch ($.data(document.body).panel){
      case 0: {
        $('.intro').toggle();
        break;
      }
      case 1: {
        $('.about').toggle();
        break;
      }
      case 2: {
        $('.family').toggle();
        break;
      }
      case 3: {
        $('.interests').toggle();
        break;
      }
    }
  });
  $('.rightNav').on('click', function(){
    subSections.hide();
    changePanel(1);
    switch ($.data(document.body).panel){
      case 0: {
        $('.intro').toggle();
        break;
      }
      case 1: {
        $('.about').toggle();
        break;
      }
      case 2: {
        $('.family').toggle();
        break;
      }
      case 3: {
        $('.interests').toggle();
        break;
      }
    }
  });

  
});

function changePanel(change){
  $.data( document.body, "panel", $.data(document.body).panel+=change);
  checkNav();
  return true;
}

function checkNav(){
  if ($.data(document.body).panel !== 3) {
    $('.rightNav').show();
  } else {
    $('.rightNav').hide();
  }
  if ($.data(document.body).panel !== 0) {
    $('.leftNav').show();
  } else {
    $('.leftNav').hide();
  }
}
