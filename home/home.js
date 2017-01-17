'use strict';

angular.module('myApp.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl'
        });
    }])

    .controller('HomeCtrl', function($scope, $location, $http) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
        $scope.lessons = {};

        function makeTree(articles, lesson){
            var s = function(parent){
                var re = [];
                angular.forEach(articles, function(value, key){
                    if(value['parent'] == parent && value['lesson']['pk'] == lesson){
                        re.push({
                            'key': key,
                            'name': value['name'],
                            'children': s(key)
                        });
                    }
                });
                return re;
            };
            return s(null);
        }

        function tree(lessons, articles){
            angular.forEach(lessons, function(value, key){
                lessons[key]['tree'] = makeTree(articles, key)
            });
            $scope.lessons = lessons;
        }
        $http.get('info/list.json', {}).success(function(articles){
            var lessons = {};
            for(var key in articles){
                var value = articles[key];
                lessons[value['lesson']['pk']] = value['lesson'];
            }
            tree(lessons, articles);
        });

        $scope.treeOptions = {
            nodeChildren: "children",
            dirSelectable: true,
            injectClasses: {
                ul: "a1",
                li: "a2",
                liSelected: "a7",
                iExpanded: "a3",
                iCollapsed: "a4",
                iLeaf: "a5",
                label: "a6",
                labelSelected: "a8"
            }
        };
    });