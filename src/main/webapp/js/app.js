var myApp = angular.module('myApp', [])

    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])

    .service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function (file, uploadUrl) {
            var fd = new FormData();
            fd.append('file', file);

            var request = {
                method: 'POST',
                url: uploadUrl,
                data: fd,
                headers: {
                    transformRequest: angular.identity,
                    'Content-Type': undefined,
                    'Accept': 'application/json;odata=verbose'
                }
            };

            // SEND THE FILES.
            $http(request)
                .success(function (d) {
                    console.log("success" + d);
                })
                .error(function () {
                    console.log("error");
                });
        }
    }])

    .controller('myCtrl', ['$scope', 'fileUpload', function ($scope, fileUpload) {
        $scope.uploadFile = function () {
            var file = $scope.myFile;

            console.log('file is ');
            console.dir(file);

            var uploadUrl = "rest/upload";
            fileUpload.uploadFileToUrl(file, uploadUrl);
        };
    }]);