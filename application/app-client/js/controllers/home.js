App.controller('HomeCtrl', ['$scope', 'chartThemes', 'bUtils', function ($scope, chartThemes, bUtils) {

    var getVelocity = function (velocity, days) {
        var arr = [bUtils.round(velocity)];
        for (var i = 1; i <= days; i++) {
            arr.push(bUtils.round(velocity - i * velocity / days))
        }
        return arr;
    };
    $(function () {
        var initializeChart = function () {
            $scope.burndownOptions = {
                title: {
                    text: 'Burndown',
                },
                xAxis: {
                    categories: ['TU', 'WE', 'TH', 'FR', 'MO', 'TU', 'WE', 'TH', 'FR', 'MO']
                },
                yAxis: {
                    title: {
                        text: null
                    },
                },
                series: [
                    {
                        name: 'Estimate points left',
                        data: getVelocity(103, 9),
                        lineWidth: 2,
                        marker: {
                            enabled: false
                        }
                    },
                    {
                        name: 'Points left',
                        type: 'area',
                        data: [103, 100, 85, 60, 60, 30, 32, 23],
                    }
                ]
            };
            $scope.sprintOptions = {
                title: {
                    text: 'Sprints',
                },
                chart: {
                    type: 'column',
                    events: {
                        load: function () {
                            $(window).resize();
                        }
                    }
                },
                xAxis: {
                    categories: [47, 48, 49, 50, 51, 52, 1]
                },
                yAxis: {
                    title: {
                        text: null
                    },
                },
                series: [
                    {
                        name: '2',
                        type: 'spline',
                        data: [105, 112.5, 104, 105, 103.5, 92.5, 101],
                        color: '#D4F1F9',
                        lineWidth: 2,
                        marker: {
                            enabled: false
                        }
                    },
                    {
                        name: '1',
                        type: 'line',
                        data: [103, 103, 103, 103, 103, 103, 103],
                        color: '#FF9A28',
                        lineWidth: 2,
                        marker: {
                            enabled: false
                        }
                    },
                    {
                        name: 'Estimate',
                        data: [120, 110, 103, 110, 105, 95, 103],
                        color: '#2CABE1'
                    },
                    {
                        name: 'Real',
                        data: [110, 115, 105, 100, 102, 90, 99],
                        color: '#97C31B',
                        colorByPoint: true,
                        colors: ['#DC6900', '#97C31B', '#97C31B', '#DC6900', '#DC6900', '#DC6900', '#DC6900']
                    }
                ]
            };

            $scope.hoursOptions = {
                title: {
                    text: 'Budget',
                },
                subtitle: {
                    useHTML: true,
                    text: "<div>120<small style='font-weight: normal; font-size: 50%'>h</small></div><div style='border-bottom: 1px solid rgba(0,0,0,0.15); margin: 0 -13px 5px;'></div><div style='font-size: 14px; font-weight: normal; color: #717171'>used of<br> 367 hour</div>",
                    verticalAlign: 'middle',
                    floating: true,
                    align: 'center',
                    style: {
                        textAlign: 'center',
                        color: '#3A4650',
                        fontSize: '31px',
                        fontWeight: 'bold',
                        padding: 0,
                        transform: 'translateY(-65%)'
                    }
                },
                chart: {
                    type: 'pie'
                },
                series: [{
                    name: 'Hours',
                    data: [["John", 35], ["Chris", 25], ["Jane", 12], ["Philip", 16], ["Mary", 12], ["Empty", 20]],
                    size: '100%',
                    innerSize: '70%',
                    showInLegend: true,
                    dataLabels: {
                        enabled: false
                    }
                }]
            };
            $scope.themes = chartThemes;
        };
        window.setTimeout(initializeChart(), 200);
    });
    setTimeout(() => {
        $('#burndown').highcharts().reflow();
        $('#sprintOptions').highcharts().reflow();
        $('#burndown3').highcharts().reflow();

    }, 200);

    $(document).ready(function () {
        $('.brand-logo').sideNav({
            menuWidth: 300, // Default is 240
            edge: 'left', // Choose the horizontal origin
            closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
        });

        $(".dropdown-button").dropdown();

        $('.collapsible').collapsible({
            expandable: true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
        });
    });

}]);

