'use strict';

angular.module('mean.system', ['ui.router', 'mean-factory-interceptor'])
  .run(['$rootScope', 'Global', function($rootScope, Global) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      var toPath = toState.url;
      toPath = toPath.replace(new RegExp('/', 'g'), '');
      toPath = toPath.replace(new RegExp(':', 'g'),'-');
      $rootScope.state = toPath;
      if($rootScope.state === '' ) {
        $rootScope.state = 'firstPage';
      }

      $rootScope.StateName = toState.name;
    });
  }])
;
