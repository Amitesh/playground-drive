export default function candidateController($state, $scope, $mdDialog, MetaInfoService) {
    'ngInject';

    $scope.data = {};
    $scope.selectedData = { candidate: {}, drive: {}, tests: [], hiringStatus: {}};

    MetaInfoService.getInfo().then(function success(info){
        console.log('in success ', info);
        $scope.data = info;
    }, function failure(error){
        console.log('in failure ', error);
    });

    function closeDialog(){
        console.log('closing dialog')
        $mdDialog.hide();
        $state.go('^');
    }

    $scope.save = function () {
        console.log($scope.selectedData);
        // closeDialog();
    };
    $scope.cancel = function () {
        closeDialog();
    };
}