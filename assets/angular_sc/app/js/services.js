angular.module('sc').factory('itemFactory', function(){
  var storeItems = items;
  // console.log('items', storeItems);
  return {
    storeItems: storeItems
  }
})

angular.module('sc').factory('cartPusher', function(){
  var cart = [];
  var updateCart = function(item, qty){
    item.qty = qty;
    cart.push(item);
  }
  var cartCount = function(){
    var totalItems = 0;
    cart.forEach(function(elem){
      totalItems+=+elem.qty
    })
    return totalItems;
  }

  return {
    cart: cart,
    updateCart: updateCart,
    cartCount: cartCount
  }
})
