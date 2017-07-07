import addEditCandidateTemplate from '../add-edit-candidate.html';

class NavigationController {
    constructor($scope, ModalService) {
        "ngInject";

        $scope.show = function () {
            ModalService.showModal({
                template: addEditCandidateTemplate,
                controller: ModalController
            }).then(function (modal) {
                if (modal.element.modal) {
                    modal.element.modal();
                } else {
                    $(modal.element).modal('show');
                }
                modal.close.then(function (result) {
                    $scope.message = "You said " + result;
                });

            });
        };
    }
}

function ModalController($scope, close) {
    'ngInject';
    $scope.save = function (result) {
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };
    $scope.close = function (result) {
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };

}

export default NavigationController;
