export default function dashboardController($scope, $http, MetaInfoService){
    'ngInject';

    let vm = this;

    MetaInfoService.getInfo().then(function success(info){
        console.log('in success ', info);

        $scope.candidates = [
            {
                "firstName": "Cox",
                "lastName": "Carney",
                "company": "Enormo",
                "employed": true
            },
            {
                "firstName": "Lorraine",
                "lastName": "Wise",
                "company": "Comveyer",
                "employed": false
            },
            {
                "firstName": "Nancy",
                "lastName": "Waters",
                "company": "Fuelton",
                "employed": false
            }
        ];

    }, function failure(error){
        console.log('in failure ', error);
    });


}