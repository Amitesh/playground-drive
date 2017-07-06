import angular from 'angular';
import uiRouter from 'angular-ui-router';

import dashboardComponent from './dashboard.component';
// import dashboardRoutes from './dashboard.routes';

export default angular.module('dashboard', [])
    .component('dashboard', dashboardComponent)
    .name;