'use strict';
define(function(require) {
    var module = require('components/pqreports/module');
    module.factory('pqService', function($http) {
        return {
            getData: function(dataSource) {
                return $http(dataSource).then(
                    function successCallback(response) {
                        return response.data;
                    }, function errorCallback(response) {
                        alert('No data returned');
                        closeLoading();
                    }
                )
            }
        }
    }); // End pqService factory
}); // End define wrapper