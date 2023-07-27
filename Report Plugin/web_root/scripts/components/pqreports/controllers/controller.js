'use strict';

define(function(require) {
    var module = require('components/pqreports/module');
    module.controller('pqReportsController', ['$scope', function($scope) {
        $scope.pqItem
        $scope.pqSelect = []
        $scope.reportTitle = 'No report selected'
        $scope.getQueryDate = () => {
            const getOptions = {
                method: 'GET',
                url: '/ws/schema/query/api'
            }

            const pq = pgDataService.getPowerQueries(getOptions).then((res) => {
                console.log(res)
            })
        }
        $scope.getTableData = () => {
            $scope.pqItemObj = JSON.parse($scope.pqItem)
            $scope.reportTitle = JSON.parse($scope.pqItem).title;
        }
    }]);//End Controller
});//End define