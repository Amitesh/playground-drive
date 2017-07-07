export default function candidateController($state, $scope, $mdDialog, MetaInfoService) {
    'ngInject';

    $scope.data = {};
    $scope.candidateFormData = {
        candidate: {
            id: null,
            firstname: null,
            lastname: null,
            email: null,
            phone: null,
            stream: null,
            role: null
        },
        drivesCandidate: {
            id: null,
            participated: null,
            driveId: null,
            candidateId: null
        },
        tests: [
            {
                id: null,
                participated: null,
                score: null,
                status: null,
                testTypeId: null,
                drivesCandidateId: null
            }
        ],
        hiringStatus: {
            id: null,
            status: null,
            comment: null,
            userId: null,
            drivesCandidateId: null
        }
    };

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
        console.log($scope.candidateFormData);
        // closeDialog();
    };
    $scope.cancel = function () {
        closeDialog();
    };
}