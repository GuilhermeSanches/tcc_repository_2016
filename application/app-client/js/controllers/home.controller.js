App.controller('HomeCtrl', ['$scope', 'HomeService', 'UserService', '$location', 'md5', 'HighchartsService',
    function ($scope, HomeService, UserService, $location, md5, HighchartsService) {

        HighchartsService.initializeChart($scope);
        HomeService.getHistory().then(function (data) {
            $scope.history = data.data.result;
            HighchartsService.initializeChart($scope);
            $('#burndown').highcharts().reflow();
        }, function (err) {

        });

        $scope.getClient = function () {
            var client = window.localStorage.getItem("client");
            var md5Email = md5.createHash((JSON.parse(client)).email);
            $scope.user = JSON.parse(client);
            $scope.user.urlAvatar = 'http://www.gravatar.com/avatar/' + md5Email;
        } ();

        $scope.reload = function () {
            HighchartsService.initializeChart($scope);
        };

        $scope.logout = function () {
            window.localStorage.clear();
            window.sessionStorage.clear();
            $location.path("/login");
        };


        $(document).ready(function () {
            // HighchartsService.initializeChart($scope);

            setInterval(() => {
                $('#burndown').highcharts().reflow();
                $('#sprintOptions').highcharts().reflow();
                $('#burndown3').highcharts().reflow();

            }, 200);

            $('.brand-logo').sideNav({
                menuWidth: 300,
                edge: 'left',
                closeOnClick: true
            });

            $(".dropdown-button").dropdown();

            $('.collapsible').collapsible({
                expandable: true
            });
        });

    }]);

