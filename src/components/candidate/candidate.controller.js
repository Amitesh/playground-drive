export default function candidateController($state, $scope, $parse, $mdDialog, $timeout,
                                            MetaInfoService, CandidateService, DashboardService) {
    'ngInject';

    var entity = angular.copy( DashboardService.getSelectedRow() ? (DashboardService.getSelectedRow().entity || {} ): {});
    $scope.data = {};
    $scope.candidateFormData = angular.extend({
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
        tests: [ //candidates_test_results
            /*{
                id: null,
                participated: null,
                score: null,
                status: null,
                testTypeId: null,
                drivesCandidateId: null
            }*/
        ],
        hiringStatus: {
            id: null,
            status: null,
            comment: null,
            userId: null,
            drivesCandidateId: null
        }
    }, entity);

    console.log('$scope.candidateFormData =>', $scope.candidateFormData);

    MetaInfoService.getInfo().then(function success(info) {
        $scope.data = info;
    }, function failure(error) {
        console.log('in failure ', error);
    });

    function closeDialog(isReload) {
        $mdDialog.hide();
        $state.go('app.dashboard', {}, {reload: isReload});
    }

    $scope.save = function () {
        if($scope.candidateFormData.candidate.firstname) {
            CandidateService.saveAll($scope.candidateFormData).then(function (res) {
                $('.notice-board').html('<span class="green">' + $scope.candidateFormData.candidate.firstname + '\'s record has been saved.</span>');
                $timeout(function () {
                    closeDialog(true)
                }, 500);
            }, function () {
                console.error('not saved');
            });
        }
    };

    $scope.cancel = function () {
        closeDialog();
        DashboardService.setSelectedRow(null);
    };
}