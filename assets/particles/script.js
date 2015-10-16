$(document).ready(function(){
   hexToBinArray(8,8);
   particleSet(hexToBinArray('01'),0);
   particleSet(hexToBinArray('23'),1);
   particleSet(hexToBinArray('45'),2);
   particleSet(hexToBinArray('67'),3);
   particleSet(hexToBinArray('78'),4);
   particleSet(hexToBinArray('9A'),5);
   particleSet(hexToBinArray('BC'),6);
   particleSet(hexToBinArray('ff'),7);

});

function particleSet(array, row){
  console.log(array);
  array.forEach(function(bit,index){
    bit ? $('#'+row+index).addClass('particleOn'): $('#'+row+index).removeClass('particleOn');
  })
}

function hexToBinArray(x,y){
  for (var z=0; z<y; z++){
    for (var i=0; i<x; i++){
      $('#main').append('<div class="box" id="' + z+i + '">' + '</div>');
    }
    $('#main').append('<br>');
  }
}

function hexToBinArray(str){
  var temp = parseInt(str,16).toString(2).split('').map(function(elem){ return +elem;});
  var add = 8-temp.length;
  for (var i = 0; i<add; i++){
    temp.unshift(0);
  }
  return temp;
}
