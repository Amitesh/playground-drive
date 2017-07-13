import angular from 'angular';
import uiRouter from 'angular-ui-router';

import superColWidthUpdateDirective from './super-col-width-update.directive';
import dashboardComponent from './dashboard.component';
// import dashboardRoutes from './dashboard.routes';

export default angular.module('dashboard', [])
    .directive('superColWidthUpdate', superColWidthUpdateDirective)
    .component('dashboard', dashboardComponent)
    .name;