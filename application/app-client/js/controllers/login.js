App.controller('LoginCtrl', ['$scope', function ($scope) {
    $(document).ready(function () {
        $('ul.tabs').tabs();
    });
    $(document).ready(function () {
        $('ul.tabs').tabs('select_tab', 'login');
    });
}]);