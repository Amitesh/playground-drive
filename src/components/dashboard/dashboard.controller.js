export default function dashboardController($scope, $http, MetaInfoService){
    'ngInject';

    let vm = this;

    MetaInfoService.getInfo().then(function success(info){
        console.log('in success ', info);
    }, function failure(error){
        console.log('in failure ', error);
    });
}