'use strict';

angular.module('mean.articles')
	.directive('uiBindHtml', bindHtmlDirective);

function bindHtmlDirective($timeout){
  return {
    restrict: 'EA',
    compile: function compile() {

      //require jquery
      
      //return postLink;
      return function(scope, iElement, iAttrs, ngModel){
          $timeout(function(){
              postLink(scope, iElement, iAttrs, ngModel);
          }, 100)
      }
    }
  };

  function postLink(scope, iElement, iAttrs) {
  	var htmlContent = scope.$eval(iAttrs.uiBindHtml);
  	iElement.html( htmlContent );
  }
}