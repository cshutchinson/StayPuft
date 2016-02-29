angular.module('sc').directive('scheader', function() {
  return {
    templateUrl: '/templates/scheader.html'
  };
});
angular.module('sc').directive('coheader', function() {
  return {
    templateUrl: '/templates/coheader.html'
  };
});
angular.module('sc').directive('stringToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(value) {
        return '' + value;
      });
      ngModel.$formatters.push(function(value) {
        return parseFloat(value, 10);
      });
    }
  };
});
