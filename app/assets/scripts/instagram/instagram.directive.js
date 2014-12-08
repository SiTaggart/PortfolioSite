angular.module('portfolio.instagram.directive', [])
    .directive('instagram', function instagramDirective($scope) {
        return {
            restrict: 'E',
            templateUrl: 'app/scripts/instagram/instagram.tpl.html',

            link: function(scope) {

            }
        };
    });
