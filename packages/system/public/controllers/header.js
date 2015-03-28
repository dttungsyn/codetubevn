'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', '$rootScope', 'Global', 'Menus', 'Helpers',
  function($scope, $rootScope, Global, Menus, Helpers) {
    $scope.global = Global;
    $scope.menus = {};

    // Default hard coded menu items for main menu
    var defaultMainMenu = [];

    // Query menus added by modules. Only returns menus that user is allowed to see.
    function queryMenu(name, defaultMenu) {

      Menus.query({
        name: name,
        defaultMenu: defaultMenu
      }, function(menu) {
        $scope.menus[name] = menu;
      });
    }

    // Query server for menus and check permissions
    queryMenu('main', defaultMainMenu);
    queryMenu('account', []);


    $scope.isCollapsed = false;

    $rootScope.$on('loggedin', function() {

      queryMenu('main', defaultMainMenu);

      $scope.global = {
        authenticated: !! $rootScope.user,
        user: $rootScope.user
      };
    });

    //2015-03-12 get categories
    $scope.categories = {};
    Helpers.getCategories( function( categories ){
      for (var i in categories){
        var category = categories[i];
        $scope.categories[ category.id ] = category.name;
      }
      
      Global.categories = $scope.categories;
    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      $scope.catId = toParams.catId;
      $scope.stateName = toState.name;
      console.log(toState);
    });
    
  }
]);
