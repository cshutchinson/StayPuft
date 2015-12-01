var orderItems = [];
var orderItemsHTML = '';
var orderSummaryHTML = '';
var orderSubTotal = 0;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function strip(html){
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

$.get( "https://galvanize-eats-api.herokuapp.com/menu", function( data ) {
  data.menu = data.menu.sort(function(a,b){
    return a.type > b.type;
  });
  var menuMarkup = '<table>';
  var type = '';
  data.menu.forEach(function(elem){
    if (elem.type !== type){
      type = elem.type;
      menuMarkup += '<tr class="type"><td class="foodtype">' +
        capitalizeFirstLetter(elem.type) + 's</td></tr>';
    }
    menuMarkup += '<tr>' + '<td>' + elem.name + '</td>' +
    '<td class="price">' + elem.price + '</td>' + '</tr>';
  });
  menuMarkup += '</table>'
  $('.menu').html(menuMarkup);
  $('tr').not('tr.type').first().addClass('selected');
  $('tr').not('tr.type').click(function(){
    $(this).addClass("selected").siblings().removeClass("selected");
  })
  $('.additembutton').click(function(){
    var selectedItem = $('tr.selected')[0].innerHTML;
    var orderQty = +$('#qty').val();
    if (orderQty<1) orderQty = 0;
    if (orderQty>99) orderQty = 0;
    for(var x=0; x<orderQty; x++){
      orderItems.push('<tr>' + selectedItem + '</tr>');
      orderSubTotal += (+$(selectedItem).last('td')[0].innerHTML);
    }
    orderItemsHTML = '<table>';
    orderItems.forEach(function(elem){
      orderItemsHTML += elem;
    })
    orderItemsHTML += '</table>';
    orderSummaryHTML = '';
    orderSummaryHTML += '<div class="ordersummary"> <table>';
    orderSummaryHTML += '<tr><td class="title">Subtotal</td> ' +
      '<td class="subtotal">' + orderSubTotal.toFixed(2) + '</td>' + '</tr>';
    orderSummaryHTML += '<tr><td class="title">Tax</td> ' + '<td class="tax"> ' +
      (orderSubTotal*.083).toFixed(2) + '</td>' + '</tr>';
    orderSummaryHTML += '<tr><td class="title"><b>Grand Total</b></td> ' +
      '<td class="total"><b>' +(orderSubTotal*1.083).toFixed(2) + '</b></td>' +
      '</tr>';
    orderSummaryHTML += '</table> </div>';
    $('.receipt').html(orderItemsHTML + orderSummaryHTML);
  })
  $('.deliverIt').click(function(){
    //send ordered items, prices, customer info
    var postData = strip(orderItems) + ' ' + $('#name').val() + ' ' +
      $('#phone').val() + ' ' + $('#address').val();
    console.log(postData);
    $.post( " https://galvanize-eats-api.herokuapp.com/orders",
      postData, function( data ) {
        console.log("Data Loaded: " + data);
      }
    );
  })


});
