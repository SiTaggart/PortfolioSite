angular.module('portfolio.icon.controller', [
    'portfolio.icon.svgRootPath'
])
    .controller('IconCtrl', function iconDirectiveController($http, $templateCache, svgRootPath) {
        var ctrl = this;

        ctrl.updateGlyph = updateGlyph;

        function updateGlyph(glyph) {
            var fullSvgPath = svgRootPath + glyph + '.svg';

            return $http.get(fullSvgPath, { cache: $templateCache })
                .then(function iconDirectiveHttpSuccess(response) {
                    return response.data;
                });
        }
    });
