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

    vm.downloadSampleCSV = function () {
        return downloadExcelCsv();
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
            $timeout(function () {
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

    // Download sample file logic

     function downloadExcelCsv() {
        var attachmentFilename = 'sample-candidate-list.csv';
        var rows = [['drive name','scheduled on','firstname','lastname','email','phone','stream','role']];

        function asUtf16(str) {
            var buffer, bufferView, i, j, ref, val;
            buffer = new ArrayBuffer(str.length * 2);
            bufferView = new Uint16Array(buffer);
            bufferView[0] = 0xfeff;
            for (i = j = 0, ref = str.length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
                val = str.charCodeAt(i);
                bufferView[i + 1] = val;
            }
            return bufferView;
        }

        function makeExcelCsvBlob(rows) {
            return new Blob([asUtf16(toTsv(rows)).buffer], {
                type: "text/csv;charset=UTF-16"
            });
        }

        function toTsv(rows) {
            var escapeValue;
            escapeValue = function (val) {
                if (typeof val === 'string') {
                    return '"' + val.replace(/"/g, '""') + '"';
                } else if (val != null) {
                    return val;
                } else {
                    return '';
                }
            };
            return rows.map(function (row) {
                    return row.map(escapeValue).join('\t');
                }).join('\n') + '\n';
        }

        var a, blob;
        blob = makeExcelCsvBlob(rows);
        a = document.createElement('a');
        a.style.display = 'none';
        a.download = attachmentFilename;
        document.body.appendChild(a);
        a.href = URL.createObjectURL(blob);
        a.click();
        URL.revokeObjectURL(a.href);
        a.remove();
    };
}