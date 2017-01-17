'use strict';

angular.module('myApp.article', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/article/:pk', {
            templateUrl: 'article/article.html',
            controller: 'ArticleCtrl'
        });
    }])

    .controller('ArticleCtrl', function($scope, $location, $http, $routeParams) {
        var pk = $routeParams.pk;
        $scope.article = {};
        $scope.text = [];
        $scope.$on('$viewContentLoaded', function(){
            $http.get('info/'+pk+'.json').success(function(article){
                $scope.article = article;
                $scope.text = JSON.parse(article['text']);
                setTimeout(function () {
                    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
                }, 500)
            });
        });
        $scope.getImage = function(data){
            return 'data:image/svg+xml;base64,' + btoa(data);
        };
    });