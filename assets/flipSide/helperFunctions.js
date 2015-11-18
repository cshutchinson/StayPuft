module.exports = {
  createCard: function(selector, image, num){
    $(selector).append('<div class="container shadow"><div class="card"><div\
     class="face front"><p>'+num+'</p></div><div class="face back"><img\
     id="'+ num + '" src="' + image + '"</div></div></div>');
  },

  insertCards: function(count, imageArray){
    for (var i=0; i<count; i=i+1){
      this.createCard($('.main'), imageArray[i], i);
    }
    return true;
  },

  retrieveImage: function(){
    return new Promise(function(succeed, fail){
      var req = new XMLHttpRequest();
      req.responseType = 'arraybuffer';
      req.open('GET', 'http://lorempixel.com/150/150/', true);
      req.onload = function(){
        if (req.status < 400) {
          succeed(req.response);
        } else {
          fail(new Error('Request failed: ' + req.statusText));
        }
      };
      req.addEventListener('error', function(){
        fail(new Error('Network error'));
      });
      req.send(null);
    });
  },

  handleImage: function(text){
    var arr = new Uint8Array(text);
    var raw = String.fromCharCode.apply(null, arr);
    var b64 = btoa(raw);
    var dataURL='data:image/jpeg;base64,'+b64;
    return dataURL;
  },

  addClickEventListener: function(target, cssClass){
    // usage addClickEventListener('.card', 'flip')
    $(target).click(function(){
      $(this).toggleClass(cssClass);
    });
    return true;
  },

  removeClickEventListener: function(target){
    $(target).unbind('click');
  },

  elmiminateDuplicateArrayElements: function(arr){
    var uniqueArray = arr.filter(function(elem, pos) {
      return arr.indexOf(elem) === pos;
    });
    return uniqueArray;
  },

  shuffleArrayElements: function(array){
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  },

  showAllCardsThenHide: function(target, cssClass, delay, numCards, cb){
    // reveal card images one by one to give preview opportunity
    $(target).each(function(i) {
      var $card = $(this);
      setTimeout(function() {
        $card.addClass(cssClass);
        // $card.click(function(){
        //   $card.toggleClass(cssClass);
        // });
      }, delay*i);
    });
    // now hide them in reverse order
    // have to delay this function until the previous code is complete
    setTimeout(function() {
      // $($(target).get().reverse()).each(function(i) {
        // var $card = $(this);
      //   setTimeout(function() {
          $(target).toggleClass(cssClass);
        // }, delay*i);
      // });
    }, delay*numCards)
    setTimeout(cb, delay*numCards*1.1);
  }
};
