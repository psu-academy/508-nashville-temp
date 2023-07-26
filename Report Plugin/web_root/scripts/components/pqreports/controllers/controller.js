'use strict';

define(function(require) {
    var module = require('components/pqreports/module');
    module.controller('pqReportsController', ['$scope', 'pqDataService', function($scope, pqDataService) {
        console.log('controller started!');
        $scope.pqItem;
        $scope.pqItemObj;
        $scope.pqSelect = [
            {title: "Report 1", path: "/ws/schema/query/com.powerschool.psu.1"},
            {title: "Report 2", path: "/ws/schema/query/com.powerschool.psu.2"}
        ];
        $scope.reportTitle = 'No Report Selected';

        /* Get PowerQuery List via the API */
        $scope.getQueryData = function() {
            var getRequest = {
                method: 'GET',
                url: '/ws/schema/query/api',
                headers: {'Content-Type': 'application/json'}
            } //End getRequest object
            pqDataService.getPowerQueries(getRequest).then( function (pqArray) {
                $scope.pqSelect = pqArray;
                closeLoading();
            });
        }

        $scope.getTableData = function() {
            console.log('Getting the PowerQuery Data');
            $scope.pqItemObj = JSON.parse($scope.pqItem);
            $scope.reportTitle = $scope.pqItemObj.title;
        };
    }]);//End Controller
});//End define