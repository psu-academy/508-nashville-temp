'use strict';

define(function(require) {
    const module = require('../module');

    module.factory('pqDataService', function($http){
        const rawData = {};
        const _service = {
            getPowerQueries: (req) => 
                _service.http(req).then((success) => {
                    return success
                }
                ,(error) => {
                    return error
                }
            ),
            http: (req) => {
                return $http(req).then((success) => {
                    return success
                },
                (error) => {
                    return error
                })
            }
        }
    })
});