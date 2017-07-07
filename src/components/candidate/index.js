import angular from 'angular';
import candidateComponent from './candidate.component';

let candidateModule = angular.module('candidate', [])
    .component('candidate', candidateComponent)
    .name;

export default candidateModule;