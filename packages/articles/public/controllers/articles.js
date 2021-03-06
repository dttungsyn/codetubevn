'use strict';

angular.module('mean.articles', ['ui-codemirror-markdown', 'bootstrap-tagsinput']).controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Global', 'Articles', '$window',
  function($scope, $stateParams, $location, Global, Articles, $window) {
    $scope.global = Global;
    $scope.hasAuthorization = function(article) {
      if (!article || !article.user) return false;
      return $scope.global.isAdmin || article.user._id === $scope.global.user._id;
    };

    $scope.global = Global;
    $scope.editorOptions = {
        lineWrapping : true,
        lineNumbers: true,
        //readOnly: 'nocursor',
        mode: 'gfm',
        theme: 'default',
        minHeight: 20,
        viewportMargin: Infinity,
        toolbarContainer: '.btn-toolbar'
    };
    
    //Get categories from global which load & set in system header controller
    $scope.categories = Global.categories;
    
    // tag input (create & edit)
    $scope.tagInputOptions = {
      typeahead: false
    };
    
    // (create & edit)
    $scope.showPostMeta = false; //TODO get from local storage

    $scope.create = function(isValid) {
      if (isValid) {
        var article = new Articles({
          title: this.title,
          content: this.content
        });
        article.$save(function(response) {
          $location.path('articles/' + response._id);
        });

        this.title = '';
        this.content = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(article) {
      if (article) {
        article.$remove(function(response) {
          for (var i in $scope.articles) {
            if ($scope.articles[i] === article) {
	           $scope.articles.splice(i,1);
            }
          }
          $location.path('articles');
        });
      } else {
        $scope.article.$remove(function(response) {
          $location.path('articles');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var article = $scope.article;
        if(!article.updated) {
          article.updated = [];
	      }
        article.updated.push(new Date().getTime());

        article.$update(function() {
          $location.path('articles/' + article._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Articles.query(function(articles) {
        $scope.articles = articles;

        for (var i = 0; i < articles.length; i = i + 1){
          if (articles[i].content){
            articles[i].htmlContent = $window.marked(articles[i].content);
          }
        }
      });
    };

    $scope.findOne = function() {
      Articles.get({
        articleId: $stateParams.articleId
      }, function(article) {
        $scope.article = article;
        $scope.htmlContent = $window.marked(article.content);
      });
    };
  }
]);
