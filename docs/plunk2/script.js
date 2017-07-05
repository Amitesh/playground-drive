var app = angular.module('influx', [ 'ngAnimate', 'ui.grid', 'ui.grid.moveColumns', 'ui.grid.selection', 'ui.grid.resizeColumns', 'ui.bootstrap', 'ui.grid.edit' ])

app.controller('MainCtrl', MainCtrl);
app.controller('RowEditCtrl', RowEditCtrl);
app.service('RowEditor', RowEditor);

MainCtrl.$inject = [ '$scope', '$http', '$modal', '$timeout', 'RowEditor', 'uiGridConstants' ];
function MainCtrl($scope, $http, $modal, $timeout, RowEditor, uiGridConstants) {
	var vm = this;

	vm.editRow = RowEditor.editRow;

	vm.serviceGrid = {
		enableRowSelection : true,
		enableRowHeaderSelection : false,
		multiSelect : false,
		enableSorting : true,
		enableFiltering : true,
		enableGridMenu : true,
		rowTemplate : "<div ng-dblclick=\"grid.appScope.vm.editRow(grid, row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell></div>"
	};

	vm.serviceGrid.columnDefs = [{
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
                    width:"60",
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
                ];


	$http.get('data1.json').success(function(response) {
		vm.serviceGrid.data = response;
		
	});

	$scope.addRow = function() {
		var newService = {
			"id" : "34"
			
		};
		var rowTmp = {};
		rowTmp.entity = newService;
		vm.editRow($scope.vm.serviceGrid, rowTmp);
	};

}

RowEditor.$inject = [ '$http', '$rootScope', '$modal' ];
function RowEditor($http, $rootScope, $modal) {
	var service = {};
	service.editRow = editRow;

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
	vm.save = save;
	function save() {
		if (row.entity.id == '0') {
			/*
			 * $http.post('http://localhost:8080/service/save', row.entity).success(function(response) { $modalInstance.close(row.entity); }).error(function(response) { alert('Cannot edit row (error in console)'); console.dir(response); });
			 */
			row.entity = angular.extend(row.entity, vm.entity);
			//real ID come back from response after the save in DB
			row.entity.id = Math.floor(100 + Math.random() * 1000);
			
			grid.data.push(row.entity);

		} else {
			row.entity = angular.extend(row.entity, vm.entity);
			/*
			 * $http.post('http://localhost:8080/service/save', row.entity).success(function(response) { $modalInstance.close(row.entity); }).error(function(response) { alert('Cannot edit row (error in console)'); console.dir(response); });
			 */
		}
		$modalInstance.close(row.entity);
	}

	vm.remove = remove;
	function remove() {
		console.dir(row)
		if (row.entity.id != '0') {
			row.entity = angular.extend(row.entity, vm.entity);
			var index = grid.appScope.vm.serviceGrid.data.indexOf(row.entity);
			grid.appScope.vm.serviceGrid.data.splice(index, 1);
			/*
			 * $http.delete('http://localhost:8080/service/delete/'+row.entity.id).success(function(response) { $modalInstance.close(row.entity); }).error(function(response) { alert('Cannot delete row (error in console)'); console.dir(response); });
			 */
		}
		$modalInstance.close(row.entity);
	}

}

app.directive('categoryHeader', function() {
        function link(scope) {

            //console.log(scope.gridOptions.columnDefs);
            scope.headerRowHeight = 30;
            scope.catHeaderRowHeight = scope.headerRowHeight + 'px';
            scope.categories = [];
            var lastDisplayName = "";
            var totalWidth = 0;
            var left = 0;
            cols=scope.vm.serviceGrid.columnDefs;
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

