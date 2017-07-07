var app = angular.module('app', ['ngAnimate','ui.grid', 'ngTouch', 'ui.grid.rowEdit', 'ui.grid.resizeColumns',  'ui.grid.selection', 'ui.bootstrap', 'ui.grid.edit']);
app.controller('MainCtrl', MainCtrl);
app.controller('RowEditCtrl', RowEditCtrl);
app.service('RowEditor', RowEditor);
app.directive('categoryHeader', categoryHeader);

MainCtrl.$inject = [ '$scope', '$http', '$timeout', '$modal', 'RowEditor', 'uiGridConstants' ];
        function MainCtrl($scope, $http, $timeout, $modal, RowEditor, uiGridConstants) {
            var vm = $scope;

            vm.editRow = RowEditor.editRow;

            vm.myData = [];

            $http.get('data.json')
            .success(function(data) {
                vm.myData = data;
                $timeout(function() {
                    if (vm.gridApi.selection.selectRow) {
                        vm.gridApi.selection.selectRow(vm.gridOptions.data[0]);
                    }
                });
            });

            vm.gridOptions = {
                enableFiltering: true,
                enableRowHeaderSelection: false,
                enableRowSelection: true,
                multiSelect: false,
                noUnselect: true,
                rowTemplate : "<div ng-dblclick=\"grid.appScope.vm.editRow(grid, row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell></div>",

                onRegisterApi: function(gridAPi) {
                    vm.gridApi = gridAPi;
                },
                data: 'myData',
                columnDefs: [{
                    field: 'canditate_id',
                    categoryDisplayName: 'Candidate',
                    width:"40",
                    displayName:"id"
                }, {
                    field: 'canditate_name',
                    categoryDisplayName: 'Candidate',
                    width:"99",
                    displayName:"name"
                }, {
                    field: 'canditate_email',
                    categoryDisplayName: 'Candidate',
                    width:"60",
                    displayName:"email"
                }, {
                    field: 'canditate_stream',
                    categoryDisplayName: 'Candidate',
                    width:"99",
                    displayName:"stream"
                }, {
                    field: 'canditate_role',
                    categoryDisplayName: 'Candidate',
                    width:"60",
                    displayName:"role"
                }, {
                    field: 'canditate_created',
                    categoryDisplayName: 'Candidate',
                    width:"99",
                    displayName:"created"
                },{
                    field: 'drive_id',
                    categoryDisplayName: 'Drive',
                    width:"30",
                    displayName:"id"
                }, {
                    field: 'drive_date',
                    categoryDisplayName: 'Drive',
                    width:"60",
                    displayName:"date"
                }, {
                    field: 'drive_name',
                    categoryDisplayName: 'Drive',
                    width:"99",
                    displayName:"name"
                }, {
                    field: 'testTypes_id',
                    categoryDisplayName: 'Test Types',
                    width:"50",
                    displayName:"id"
                }, {
                    field: 'testTypes_id_testTypesId',
                    categoryDisplayName: 'Test Types',
                    width:"50",
                    displayName:"T T Id"
                }, {
                    field: 'testTypes_test',
                    categoryDisplayName: 'Test Types',
                    width:"120",
                    displayName:"test"
                }, {
                    field: 'testTypes_score',
                    categoryDisplayName: 'Test Types',
                    width:"60",
                    displayName:"score"
                }, {
                    field: 'testTypes_status',
                    categoryDisplayName: 'Test Types',
                    width:"60",
                    displayName:"status"
                },{
                    field: 'testTypes_driveId',
                    categoryDisplayName: 'Test Types',
                    width:"50",
                    displayName:"Drive Id"
                }, {
                    field: 'hiringStatus_userId',
                    categoryDisplayName: 'Hiring Status',
                    width:"70",
                    displayName:"User Id"
                }, {
                    field: 'hiringStatus_driveId',
                    categoryDisplayName: 'Hiring Status',
                    width:"70",
                    displayName:"Drive Id"
                }, {
                    field: 'hiringStatus_status',
                    categoryDisplayName: 'Hiring Status',
                    width:"70",
                    displayName:"Status"
                },{
                    field: 'hiringStatus_comment',
                    categoryDisplayName: 'Hiring Status',
                    width:"99",
                    displayName:"Comment"
                }
                ]

            }

            vm.info = {};

            vm.gridOptions.onRegisterApi = function (gridApi) {
                //set gridApi on scope
                vm.gridApi = gridApi;

                gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    vm.gridApi.grid.appScope.lastSelectedRow = row;
                });

                gridApi.grid.element.on('click', function (ev) {
                    if (vm.gridApi.grid.appScope.lastSelectedRow) {
                        // affect only rows (not footer or header)
                        if (ev.target.className.includes('ui-grid-cell-contents')) {
                            var name = vm.gridApi.grid.appScope.lastSelectedRow.entity;
                            vm.addToQueue(name);
                        }
                    }
                });
            };



            vm.addToQueue = function addToQueue (entity) {
                console.log('addToQueue fired, name = ' + JSON.stringify(entity));
            };


        };

    function categoryHeader() {
        function link(scope) {
            console.log(scope.gridOptions.columnDefs);
            scope.headerRowHeight = 30;
            scope.catHeaderRowHeight = scope.headerRowHeight + 'px';
            scope.categories = [];
            var lastDisplayName = "";
            var totalWidth = 0;
            var left = 0;
            cols=scope.gridOptions.columnDefs;
            for(var i=0;i<cols.length;i++)
            {



                totalWidth += Number(cols[i].width);


                var displayName = (typeof(cols[i].categoryDisplayName) === "undefined") ?
                    "\u00A0" : cols[i].categoryDisplayName;

                if (displayName !== lastDisplayName) {

                    scope.categories.push({
                        displayName: lastDisplayName,
                        width: totalWidth - Number(cols[i].width),
                        widthPx: (totalWidth - Number(cols[i].width)) + 'px',
                        left: left,
                        leftPx: left + 'px'
                    });

                    left += (totalWidth - Number(cols[i].width));
                    totalWidth = Number(cols[i].width);
                    lastDisplayName = displayName;
                }
            }

            if (totalWidth > 0) {

                scope.categories.push({
                    displayName: lastDisplayName,
                    width: totalWidth,
                    widthPx:totalWidth +'px',
                    left: left,
                    leftPx: left + 'px'
                });
            }

        }
        return {


            templateUrl: 'category_header.html',
            link: link
        };
    };

RowEditor.$inject = [ '$http', '$rootScope', '$modal' ];
function RowEditor($http, $rootScope, $modal) {
    var service = {};
    service.editRow = editRow;
    alert("in function");

    function editRow(grid, row) {
        $modal.open({
            templateUrl : 'playground-edit.html',
            controller : [ '$http', '$modalInstance', 'grid', 'row', RowEditCtrl ],
            controllerAs : 'vm',
            resolve : {
                grid : function() {
                    return grid;
                },
                row : function() {
                    return row;
                }
            }
        });
    }

    return service;
}

function RowEditCtrl($http, $modalInstance, grid, row) {
    var vm = this;
    vm.entity = angular.copy(row.entity);
    alert("in controller");
};

app.directive('categoryHeader', function() {
        function link(scope) {

            console.log(scope.gridOptions.columnDefs);
            scope.headerRowHeight = 30;
            scope.catHeaderRowHeight = scope.headerRowHeight + 'px';
            scope.categories = [];
            var lastDisplayName = "";
            var totalWidth = 0;
            var left = 0;
            cols=scope.gridOptions.columnDefs;
            for(var i=0;i<cols.length;i++)
            {



                totalWidth += Number(cols[i].width);


                var displayName = (typeof(cols[i].categoryDisplayName) === "undefined") ?
                    "\u00A0" : cols[i].categoryDisplayName;

                if (displayName !== lastDisplayName) {

                    scope.categories.push({
                        displayName: lastDisplayName,
                        width: totalWidth - Number(cols[i].width),
                        widthPx: (totalWidth - Number(cols[i].width)) + 'px',
                        left: left,
                        leftPx: left + 'px'
                    });

                    left += (totalWidth - Number(cols[i].width));
                    totalWidth = Number(cols[i].width);
                    lastDisplayName = displayName;
                }
            }

            if (totalWidth > 0) {

                scope.categories.push({
                    displayName: lastDisplayName,
                    width: totalWidth,
                    widthPx:totalWidth +'px',
                    left: left,
                    leftPx: left + 'px'
                });
            }

        }
        return {


            templateUrl: 'category_header.html',
            link: link
        };
    });
