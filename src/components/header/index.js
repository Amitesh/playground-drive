import angular              from 'angular';
import headerComponent  from './header.component';

let headerModule = angular.module('header', [])

    .component('header', headerComponent)
    .name;

export default headerModule;