'use strict';

define(function(require) {
    var module = require('components/pqreports/module');
    module.controller('pqReportsController', ['$scope', 'pqDataService', 'pqService', '$filter',
    function($scope, pqDataService, pqService, $filter) {
        console.log('controller started!');
        $scope.pqItem;
        $scope.pqItemObj;
        $scope.rowHeaders = []; //sanitized header title
        $scope.rowHeadersRaw = []; //query column name from the headers
        $scope.rowHeadersBoth = []; //both column name and sanitized header
        $scope.pqSelect = [];
        $scope.requiredArgs = [];
        $scope.suppliedArgs = [];
        $scope.reportTitle = 'No Report Selected';
        $scope.totalRows = "100";

        /* Get PowerQuery List via the API */
        $scope.getQueryData = function() {
            var getRequest = {
                method: 'GET',
                url: '/ws/schema/query/api',
                headers: {'Content-Type': 'application/json'}
            } //End getRequest object
            pqDataService.getPowerQueries(getRequest).then( function (pqArray) {
                $scope.pqSelect = pqArray;
                console.log($scope.pqSelect);
                closeLoading();
            });
        }

        $scope.getTableData = function() {
            console.log('Getting the PowerQuery Data');
            $scope.pqItemObj = JSON.parse($scope.pqItem);
            $scope.reportTitle = $scope.pqItemObj.title;
            $scope.requiredArgs = $scope.pqItemObj.args;
            $scope.tableData = {};
            $scope.rowHeaders = []; //sanitized header title
            $scope.rowHeadersRaw = []; //query column name from the headers
            $scope.rowHeadersBoth = []; //both column name and sanitized header

            /* Build and sanitize headers */
            angular.forEach($scope.pqItemObj.headers, function(n, key) {
                //console.log(n + '-' + key);
                $scope.rowHeadersRaw.push(n);
                var tempHeader = $scope.sanitizeHeader(n);
                $scope.rowHeaders.push(tempHeader);
                $scope.rowHeadersBoth.push({"field": n, "name": tempHeader, "showItem": true});
            });
            console.log($scope.rowHeaders);
            $scope.rowHeadersBoth = $filter('orderBy')($scope.rowHeadersBoth, 'name');

            if (
                $scope.requiredArgs.length === 0
                || $scope.suppliedArgs.length === $scope.requiredArgs.length
            ) {
                var pqRequest = {
                    method: 'POST',
                    url: $scope.pqItemObj.url + '?pagesize=' + $scope.totalRows,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    data: {},
                    datatype: 'json'
                }

                /* Intercept request object and add parameters if required */
                if ($scope.requiredArgs.length > 0) {
                    angular.forEach($scope.suppliedArgs, function(v, key) {
                        pqRequest.data[$scope.requiredArgs[key]] = v;
                    });
                }

                pqService.getData(pqRequest).then( function(result) {
                    $scope.tableData = result;
                    console.log($scope.tableData);

                    closeLoading();
                });

            } else {
                console.log('User did not supply required parameters');
            }


        };

        $scope.sanitizeHeader = function(str) {
            var tempKey = str.replace('_',' ');
            return tempKey.replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }

    }]);//End Controller
});//End define