'use strict';
define(function(require) {
    // This will load the main AngularJS module of PowerSchool which is what we use to bootstrap the document
    require ('components/shared/index');
    
    //This will load and configure all your AngularJS code to bootstrap
    require('components/pqreports/module');
    require('components/pqreports/controllers/index');
    //require('components/pqreports/directives/index');
    require('components/pqreports/services/index');
    
});