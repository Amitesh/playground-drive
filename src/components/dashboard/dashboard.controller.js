export default function dashboardController($scope, $http){
    'ngInject';

    let vm = $scope;

    $http.get('http://localhost:3000/meta-info')
        .then(function successCallback(response) {
            console.log('success response =>', response.data);
        }, function errorCallback(response) {
            console.log('Failure response =>', response);
        });

}