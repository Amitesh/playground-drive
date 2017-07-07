'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';

import 'angular-material/angular-material.scss';
import './style.scss';

if (module.hot) {
    module.hot.accept()
}

import navigationComponent from './components/navigation/navigation';
import dashboardModule from './components/dashboard/index';
import headerComponent from './components/header';
import candidateComponent from './components/candidate';
import appComponent from './components/app/app.component';
import metaInfoService from './services/meta-info.service';
import candidatePopup from './components/candidate/candidate-popup.html';
import candidateController from './components/candidate/candidate.controller';


let interviewDriveApp = angular.module('idriveApp', [
    uirouter,
    angularAnimate,
    angularMaterial,
    dashboardModule,
    navigationComponent,
    headerComponent,
    candidateComponent
]);

interviewDriveApp.config(function ($urlRouterProvider, $locationProvider, $stateProvider) {
    'ngInject';

    // $locationProvider.html5Mode(true);
    // $locationProvider.hashPrefix('!');

    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            template: '<app></app>'
        })
        // Dashboard page to contain our goats list page
        .state('app.dashboard', {
            url: '/dashboard',
            template: '<dashboard></dashboard>'
        })
        .state('app.dashboard.candidate', {
            url: '/candidate/add-edit',
            views: {'candidate-modal': {}},

            onEnter: function ($state, $mdDialog) {
                'ngInject';

                // var items = [1, 2, 3];

                $mdDialog.show({
                    template: candidatePopup,

                    // locals: {
                    //     items: items
                    // },
                    controller: candidateController,
                    controllerAs: 'vm'
                });
            }
        });

    $urlRouterProvider.otherwise('/app/dashboard');
});
interviewDriveApp.component('app', appComponent);
interviewDriveApp.service('MetaInfoService', metaInfoService);


// interviewDriveApp.run(function(){
//     angular.bootstrap(document, ['idriveApp']);
// });