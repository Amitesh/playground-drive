export default function importController($scope, $timeout, uiGridImporterService) {
    'ngInject';

    let vm = this,
        gridApi;

    const reader = new FileReader();

    $('#import-file').change(importCSV);

    vm.reset = reset;
    vm.import = function () {
        $('#import-file').click();
    };

    vm.gridOptions = {
        data: [],
        importerDataAddCallback: function (grid, newObjects) {
            console.log(newObjects);
            vm.gridOptions.data = vm.gridOptions.data.concat(newObjects);
            document.getElementById('import-file').value = '';
        },
        onRegisterApi: function (api) {
            gridApi = api;
            reader.onload = uiGridImporterService.importCsvClosure(gridApi.grid);
        }
    };

    function importCSV() {
        const file = document.getElementById('import-file');

        if (file.files[0]) {
            vm.reset();
            $timeout(function(){
                reader.readAsText(file.files[0]);
            }, 10);
        } else {
            alert('Upload the file!');
        }
    };

    function reset() {
        vm.gridOptions.data = [];
        vm.gridOptions.columnDefs = [];
        vm.gridOptions.columns = null;
    }
}