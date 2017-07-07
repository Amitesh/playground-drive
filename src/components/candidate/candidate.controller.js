export default function ModalController($scope, close, MetaInfoService) {
    'ngInject';

    MetaInfoService.getInfo().then(function success(info){
        console.log('in success ', info);
    }, function failure(error){
        console.log('in failure ', error);
    });

    $scope.save = function (result) {
        close(result, 500);
    };
    $scope.cancel = function (result) {
        close(result, 500);
    };
}