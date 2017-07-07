'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';
import angularModalService from 'angular-modal-service';

import './style.scss';


//
// import {groupBy} from 'lodash/collection'
// import people from './data/people'

if (module.hot) {
  module.hot.accept()
}

console.log(angularModalService.name);
import navigationComponent from './components/navigation/navigation';
import dashboardModule from './components/dashboard/index';
import headerComponent from './components/header';
import appComponent from './components/app/app.component';
import metaInfoService from './services/meta-info.service';

let interviewDriveApp = angular.module('idriveApp', [
    uirouter,
    'angularModalService',
    dashboardModule,
    navigationComponent,
    headerComponent
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
        });

    $urlRouterProvider.otherwise('/app/dashboard');
});
interviewDriveApp.component('app', appComponent);
interviewDriveApp.service('MetaInfoService', metaInfoService);

// interviewDriveApp.run(function(){
//     angular.bootstrap(document, ['idriveApp']);
// });