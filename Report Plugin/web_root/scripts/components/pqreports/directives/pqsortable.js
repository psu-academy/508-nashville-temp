'use strict';
define(function(require) {
    var module = require('components/pqreports/module');
    module.directive('pqSortable', ['pqSortableConfig', '$log', function(pqSortableConfig, $log) {
        return {
            require: '?ngModel',
            link: function(scope, element, attrs, ngModel) {
                if (!ngModel) {
                    $log.error('pqSortable needs an ng-model attribute', element);
                    return;
                }
                var opts = {};
                angular.extend(opts, pqSortableConfig);
                opts.update = update;

                //Listen for changes on pqSortable attribute
                scope.$watch(attrs.pqSortable, function(newVal) {
                    angular.forEach(newVal, function(value, key) {
                        element.sortable('option', key, value);
                    });
                }, true);

                //Store the sortable index
                scope.$watch(attrs.ngModel+'.length', function() {
                    element.children().each(function (i, el) {
                        $j(el).attr('sortable-index', i);
                    });
                });

                function update(event, ui) {
                    //Get the model
                    var model = ngModel.$modelValue;
                    //Remember its length
                    var modelLength = model.length;
                    //Remember html nodes
                    var items = [];
                    //Loop through items in their new fancy order
                    element.children().each( function(index) {
                        var item = $j(this);
                        //Get the old item index
                        var oldIndex = parseInt(item.attr('sortable-index'), 10);
                        //Add item to the end of model
                        model.push(model[oldIndex]);
                        if (item.attr('sortable-index')) {
                            // items in original order to restore DOM
                            items[oldIndex] = item;
                            // FINALYYYYYYYYYY remove item from DOM
                            item.detach();
                        }
                    }); //End element.children() loop
                    model.splice(0, modelLength);
                    //Restore original DOM order so angular doesn't get confused
                    element.append.apply(element, items);
                    //Tell angular we changed everything
                    scope.$digest();
                }//End update function

                element.sortable(opts);
            }
        }
    }]); //End directive
}); //End define