'use strict';

define(function(require) {
    var module = require('components/pqreports/module');
    module.controller('pqReportsController', ['$scope', function($scope) {
        console.log('controller started!');
        $scope.pqItem;
        $scope.pqItemObj;
        $scope.pqSelect = [
            {title: "Report 1", path: "/ws/schema/query/com.powerschool.psu.1"},
            {title: "Report 2", path: "/ws/schema/query/com.powerschool.psu.2"}
        ];
        $scope.reportTitle = 'No Report Selected';

        $scope.getTableData = function() {
            console.log('Getting the PowerQuery Data');
            $scope.pqItemObj = JSON.parse($scope.pqItem);
            $scope.reportTitle = $scope.pqItemObj.title;
        };
    }]);//End Controller
});//End define