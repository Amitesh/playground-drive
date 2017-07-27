'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularAnimate from 'angular-animate';
import ngSanitize from 'angular-sanitize';
import angularMaterial from 'angular-material';
import angularUIGrid from 'angular-ui-grid';
import uiGridAutoFitColumns from 'ui-grid-auto-fit-columns';

import 'angular-material/angular-material.scss';
import 'angular-ui-grid/ui-grid.css';
import './style.scss';

if (module.hot) {
    module.hot.accept()
}

import navigationComponent from './components/navigation/navigation';
import dashboardModule from './components/dashboard/index';
import headerComponent from './components/header';
import candidateComponent from './components/candidate';
import appComponent from './components/app/app.component';
import candidatePopup from './components/candidate/candidate-popup.html';
import candidateController from './components/candidate/candidate.controller';

import metaInfoService from './services/meta-info.service';
import candidateService from './services/candidate.service';
import dashboardService from './services/dashboard.service';

let interviewDriveApp = angular.module('idriveApp', [
    uirouter,
    angularAnimate,
    ngSanitize,
    angularMaterial,
    angularUIGrid,
    'ui.grid.selection',
    'ui.grid.exporter',
    'ui.grid.moveColumns',
    'ui.grid.autoResize',
    'ui.grid.resizeColumns',
    uiGridAutoFitColumns,
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

            onEnter: function ($state, $stateParams, $mdDialog, DashboardService) {
                'ngInject';

                console.log('$state =>', DashboardService.getSelectedRow());

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
interviewDriveApp.service('CandidateService', candidateService);
interviewDriveApp.service('DashboardService', dashboardService);


// interviewDriveApp.run(function(){
//     angular.bootstrap(document, ['idriveApp']);
// });