describe('Directive: Icon', function() {
    var $compile,
        $scope,
        $httpBackend;

    beforeEach(module('portfolio-templates'));

    beforeEach(function() {
        angular.module('test-module.config', ['portfolio.icon'])
            .config(function(svgRootPathProvider) {
                svgRootPathProvider.setRootPath('/svg/icons/');
            });

        module('test-module.config');
    });

    beforeEach(inject(function($injector) {
        $compile = $injector.get('$compile');
        $scope = $injector.get('$rootScope').$new();
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.whenGET('/svg/icons/ic-icon.svg').respond('');
    }));

    function compileDirective(scope) {
        var element = angular.element('<icon glyph="ic-icon"></icon>');

        return $compile(element)(scope);
    }

    describe('Icon element', function() {
        it('should set the correct svg path', function() {
            $httpBackend.expectGET('/svg/icons/ic-icon.svg');

            compileDirective($scope);
            $scope.$digest();
        });

        it('should set the css class to "icon"', function() {
            var element = compileDirective($scope);
            $scope.$digest();
            expect(element.attr('class')).toContain('icon');
        });

    });
});
