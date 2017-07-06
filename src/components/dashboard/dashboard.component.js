import template from './dashboard.html';
import controller from './dashboard.controller';
// import './goatsList.scss';

const dashboardComponent = {
    restrict: 'E',
    // bindings: {
    //     goats: '<'
    // },
    template,
    controller,
    controllerAs: 'vm'
};

export default dashboardComponent;