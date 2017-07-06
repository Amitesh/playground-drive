export default function dashboardRoutes($stateProvider){
    'ngInject';

    $stateProvider
        .state('app.dashboard', {
            url: '/dashboard',
            // abstract: true,
            template: '<dashboard></dashboard>'
        });
}