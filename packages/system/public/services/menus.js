'use strict';

angular.module('mean.system').factory('Menus', ['$resource',
  function($resource) {
    return $resource('admin/menu/:name', {
      name: '@name',
      defaultMenu: '@defaultMenu'
    });
  }
])
// 2015/3/28
.factory('Helpers', ['$http',
  function($http) {
    return {
      name: 'Helpers',
      
      getCategories: function( cb ){
    	  $http.get('/categories').success(function( categories ){
    		  if ( typeof(cb) === 'function' ){
    			  cb ( categories );
    		  }
    	  });
      }
    };
  }
]);
