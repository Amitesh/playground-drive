import angular from 'angular';
import uiRouter from 'angular-ui-router';

import importComponent from './import.component';

export default angular.module('import', [])
    .component('import', importComponent)
    .name;