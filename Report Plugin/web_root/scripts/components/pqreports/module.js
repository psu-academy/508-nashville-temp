'use strict';

define(function(require) {
    //This line will ensure AngularJS is loaded,
    //if it has not been loaded yet, RequireJS will load it.
    //Once loaded we will instantiate the var and use it to set up our module
    var angular = require('angular');
    return angular.module('pqReports', ['powerSchoolModule']).value('pqSortableConfig', {
        placeholder: "placeholder",
        opacity: 0.8,
        axis: "y",
        helper: "clone",
        forcePlaceholderSize: true
    });
    
});