var App = window.angular.module('App', ['ngMaterial', 'ngRoute', 'bHighcharts']);

App.config(function ($routeProvider, $httpProvider, $mdThemingProvider) {
    // $httpProvider.interceptors.push('TokenInterceptor');
    $mdThemingProvider.theme('docs-dark');

    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl',
            access: { requiredAuthentication: true }
        })

        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            access: { requiredAuthentication: false }
        })

        .when('/signup', {
            templateUrl: 'views/signup.html',
            controller: 'SignupCtrl',
            access: { requiredAuthentication: false }
        })

        .otherwise({
            redirectTo: '/'
        });
});


App.run(function ($rootScope, $location, $route, $window) {
    var nextPath = $location.path();
    var nextRoute = $route.routes[nextPath];

    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
        if (nextRoute.access) {
            if (nextRoute.access.requiredAuthentication && $window.localStorage.isLogado=='false') {
                $location.path("/login");
            }
        } else {
            $location.path("/login");
        }
    });
});


App.value('API', 'http://localhost:8080');


