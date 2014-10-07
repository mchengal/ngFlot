angular.module('ng-flot', [])
    .controller('flotController', ['$scope', function(scope) {

        var self = this;
        self.flot = undefined;

        self.init = function(element) {
            if (self.flot == undefined) {
                self.flot = $.plot(element, scope.dataset(), scope.options());
            } else {
                self.flot.setData(scope.dataset());
                self.flot.draw();
            }
        }
    }])
    .directive('flot', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        controller: 'flotController',
        scope: {
            dataset: '&',
            options: '&',
            datalength: '='
        },
        link: function (scope, element, attributes, ctrl) {
            var height, init, canvas, width;
            width = attributes.width == undefined? '100%' : attributes.width;
            height = attributes.height == undefined? '100%' : attributes.height;
            if (!scope.dataset()) {
                scope.dataset = [];
            }
            if (!scope.options()) {
                scope.options = {
                    legend: {
                        show: false
                    }
                };
            }
            canvas = $(element.children()[0]);
            canvas.css({
                width: width,
                height: height
            });
            init = function () {
                return ctrl.init(canvas);
            };
            scope.$watch('datalength', function (d) {
                if (d > 0)
                    return init();

            });
            //return scope.$watch('options', function() {
            //  var plot;
            //  return plot = init();
            //});
        }
    };
});
