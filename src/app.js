'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularModalService from 'angular-modal-service';

import './style.scss';

if (module.hot) {
  module.hot.accept()
}

console.log(angularModalService.name);
import navigationComponent from './components/navigation/navigation';
import dashboardModule from './components/dashboard/index';
import headerComponent from './components/header';
import candidateComponent from './components/candidate';
import appComponent from './components/app/app.component';
import metaInfoService from './services/meta-info.service';

import candidatePopup from './components/candidate/candidate-popup.html'
import candidateController from './components/candidate/candidate.controller';


let interviewDriveApp = angular.module('idriveApp', [
    uirouter,
    'angularModalService',
    dashboardModule,
    navigationComponent,
    headerComponent,
    candidateComponent
]);

interviewDriveApp.config(function($urlRouterProvider, $locationProvider, $stateProvider
                                  ) {
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
            onEnter: function($state, ModalService){
                'ngInject';

                ModalService.showModal({
                    template: candidatePopup,
                    controller: candidateController
                }).then(function (modal) {
                    if (modal.element.modal) {
                        modal.element.modal();
                    } else {
                        $(modal.element).modal('show');
                    }
                    modal.close.then(function (result) {
                        $state.go('app.dashboard');
                    });
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