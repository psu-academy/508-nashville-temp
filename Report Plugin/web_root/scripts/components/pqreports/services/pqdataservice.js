'use strict';
define(function(require) {
    var module = require('components/pqreports/module');
    module.factory('pqDataService', function($http) {
        var rawData = {};
        var _service = {
            getPowerQueries: function(req) {
                return _service.http(req).then(function (result) {
                    //do stuff
                }); //End _service.http
            }, //End getPowerQueries
            http: function(req) {
                return $http(req).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });//End $http
            }//End http
        } //End _service
    }); //End module.factory
}); //End define