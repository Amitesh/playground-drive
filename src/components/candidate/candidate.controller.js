export default function candidateController($state, $scope, $parse, $mdDialog,
                                            MetaInfoService, CandidateService) {
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
    };

    // $scope.propertify = function (string) {
    //     var p = $parse(string);
    //     var s = p.assign;
    //     return function (newVal) {
    //         if (newVal) {
    //             s($scope, newVal);
    //         }
    //         return p($scope);
    //     };
    // };


    MetaInfoService.getInfo().then(function success(info) {
        console.log('in success ', info);
        $scope.data = info;
    }, function failure(error) {
        console.log('in failure ', error);
    });

    function closeDialog() {
        console.log('closing dialog')
        $mdDialog.hide();
        $state.go('^');
    }

    $scope.save = function () {
        console.log($scope.candidateFormData);
        // $scope.candidateFormData = formatPostData($scope.candidateFormData);
        CandidateService.saveAll($scope.candidateFormData).then(function(res){
            console.log('saved');
        }, function(){
            console.error('not saved');
        });
        // closeDialog();
    };

    $scope.cancel = function () {
        closeDialog();
    };

    function formatPostData(data){
        var t = angular.copy(data.tests);
        var tt = [];

        angular.forEach(t, function(v, k){
            if(v){
                v.id = k;
                tt.push(v);
            }
        });

        data.tests = tt;

        return data;
    }
}