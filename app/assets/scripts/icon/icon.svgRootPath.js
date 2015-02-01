angular.module('portfolio.icon.svgRootPath', [])
    .provider('svgRootPath', function svgRootPathProviderConfig() {
        this.setRootPath = setRootPath;
        this.$get = function svgRootPathProviderGet($log) {
            if (this.svgRootPath === undefined) {
                $log.error('No svgRootPath provided. Please configure this using the svgRootPathProvider');
            }

            return this.svgRootPath;
        };

        function setRootPath(newRootPath) {
            this.svgRootPath = newRootPath;
        }
    });
