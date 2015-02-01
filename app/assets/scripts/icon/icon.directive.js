/**
 * @description Icon directive used to load an inline svg icon, simliar to icon
 *              font methods of past <i class="icon-foo-bar"></i>
 * @example
 * <icon glyph="ic-add-circle"></icon>
 */
angular.module('portfolio.icon.directive', [
    'portfolio.icon.controller'
])
    .directive('icon', function iconDirective() {
        return {
            bindToController: true,
            controller: 'IconCtrl as iconCtrl',
            restrict: 'E',
            scope: {
                glyph: '@'
            },
            compile: function iconDirectiveCompile(tElement) {
                tElement.addClass('icon');
                tElement.attr('aria-hidden', true);

                return function iconDirectiveLink($scope, element, attrs, ctrl) {
                    $scope.$watch('iconCtrl.glyph', function iconDirectiveLinkWatch(newValue) {
                        ctrl.updateGlyph(newValue)
                            .then(function iconUpdateGlyphThen(svg) {
                                element.html(svg);
                            });
                    });
                };
            }
        };
    });
