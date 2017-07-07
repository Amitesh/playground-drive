export default function ModalController($scope, close) {
    'ngInject';
    $scope.save = function (result) {
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };
    $scope.cancel = function (result) {
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };

}