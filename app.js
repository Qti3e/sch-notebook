'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'treeControl',
  'myApp.home',
  'myApp.article'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.when('/about', {templateUrl: 'about/about.html'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
