'use strict';
define(function(require) {
    var module = require('components/pqreports/module');
    module.factory('pqDataService', function($http) {
        var rawData = {};
        var _service = {
            getPowerQueries: function(req) {
                return _service.http(req).then(function (result) {
                    if (result.data.paths) {
                        var pqArray = [];
                        var pqHeaders = [];
                        angular.forEach(result.data.paths, function(value,key) {
                            if (value.post.tags.indexOf('pqreport') > -1) {
                                pqHeaders = [];
                                if (typeof result.data.definitions['powerquery.resp.'+key.replace('/ws/schema/query/','')+'.record'] !== 'undefined') {
                                    for (var key in result.data.definitions['powerquery.resp.'+key.replace('/ws/schema/query/','')+'.record'].properties) {
                                        pqHeaders.push(key);
                                    };
                                } else {
                                    // hold for the future
                                }

                                pqArray.push({
                                    title: value.post.summary,
                                    url: key,
                                    headers: pqHeaders
                                });
                            }
                        });
                        return pqArray;
                    } else {
                        return {error: "No PowerQueries supporting PQ Reports Exists"}
                    }
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
        return _service;
    }); //End module.factory
}); //End define