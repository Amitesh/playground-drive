export default function importRoutes($stateProvider){
    'ngInject';

    $stateProvider
        .state('app.import', {
            url: '/import',
            // abstract: true,
            template: '<import></import>'
        });
}