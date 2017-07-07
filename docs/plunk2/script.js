var app = angular.module('influx', [ 'ngAnimate', 'ngMaterial', "ngMessages", 'ui.grid', 'ui.grid.moveColumns', 'ui.grid.selection', 'ui.grid.resizeColumns', 'ui.bootstrap', 'ui.utils', 'ui.grid.edit' ])

app.controller('MainCtrl', MainCtrl);
app.controller('RowEditCtrl', RowEditCtrl);
app.service('RowEditor', RowEditor);

MainCtrl.$inject = [ '$scope', '$http', '$mdDialog', '$timeout', 'RowEditor', 'uiGridConstants' ];
function MainCtrl($scope, $http, $mdDialog, $timeout, RowEditor, uiGridConstants) {
	var vm = this;

	vm.editRow = RowEditor.editRow;

	vm.project = {
	    description: 'Nuclear Missile Defense System',
	    rate: 500,
	    special: true
    };

    vm.candidate = {id:200};

	vm.streams = [{id: 1, type: 'Java' }, {id: 2, type: 'QA' }];
	vm.roles = [{id: 1, type: 'Lead' }, {id: 2, type: 'Developer' }];
	vm.selectedRoles = vm.roles[0];
	vm.selectedStream = "java";


	vm.serviceGrid = {
		enableRowSelection : true,
		enableRowHeaderSelection : false,
		enableColumnMenus: false,// remove sort icons
		multiSelect : false,
		enableSorting : false,
		enableFiltering : true,
		enableGridMenu : false,
		rowTemplate : "<div ng-click=\"grid.appScope.vm.editRow(grid, row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell></div>"
	};

	vm.serviceGrid.columnDefs = [
                /*{
                    field: 'canditate.id',
                    categoryDisplayName: 'Candidate',
                    width:"40",
                    displayName:"id"
                },*/ {
                    field: 'canditate_name',
                    categoryDisplayName: 'Candidate',
                    width:"99",
                    displayName:"name"
                }, {
                    field: 'canditate_email',
                    cellTemplate: 'name-template.html',
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
                    field: 'drive_date',
                    categoryDisplayName: 'Drive',
                    width:"90",
                    displayName:"drive date"
                }, {
                    field: 'drive_name',
                    categoryDisplayName: 'Drive',
                    width:"99",
                    displayName:"drive name"
                }, {
                    field: 'meetalTestStatus',
                    categoryDisplayName: 'Test Types',
                    width:"70",
                    displayName:"Meetl"
                }, {
                    field: 'minipgTestStatus',
                    categoryDisplayName: 'Test Types',
                    width:"80",
                    displayName:"Mini PG"
                }, {
                    field: 'pgTestStatus',
                    categoryDisplayName: 'Test Types',
                    width:"70",
                    displayName:"PG"
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
                    field: 'hiringStatus_status',
                    categoryDisplayName: 'Hiring Status',
                    width:"120",
                    displayName:"hiring status"
                },{
                    field: 'hiringStatus_comment',
                    categoryDisplayName: 'Hiring Status',
                    width:"120",
                    displayName:"comments"
                }
                ];


	$http.get('data1.json').then(function(response) {
		vm.serviceGrid.data = response.data;
		
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

RowEditor.$inject = [ '$http', '$rootScope', '$mdDialog' ];
function RowEditor($http, $rootScope, $mdDialog) {
	var service = {};
	service.editRow = editRow;

	function editRow(grid, row) {
        $mdDialog.show({
			templateUrl : 'playground-edit.html',
			controller : [ '$http', '$mdDialog', 'grid', 'row', RowEditCtrl ],
			controllerAs : 'vm',
			resolve : {
				grid : function() {
					return grid;
				},
				row : function() {
					return row;
				},

			}
		});
	}

	return service;
}

function RowEditCtrl($http, $mdDialog,  grid, row) {
	var vm = this;
	vm.entity = angular.copy(row.entity);
	vm.save = save;

    vm.candidate = {
        name : null,
        email : null,
        stream : null,
        role : {id:1,type:'Lead'},
        created : null
    };

    vm.testStatus = ['Hold','clear','Fail'];
    vm.hiringStatus= ['selected', 'rejected'];
    vm.streams = [{id: 1, type: 'Java' }, {id: 2, type: 'QA' },{id: 1, type: 'WebUI' }, {id: 2, type: 'Archi' },{id: 1, type: 'manager' }, {id: 2, type: 'Testing' }, {id: 2, type: 'Marketing' }];
    vm.roles1 = [{'id':1,'type':'Lead'},{'id': 2,'type':'Developer'},{'id':1,'type':'Junior Engg'},{'id': 2,'type':'Archi'},{'id':1,'type':'Senior Engg'},{'id': 2,'type':'Archi'}];
    vm.selectedRole = vm.roles1[1];
    vm.selectedStream = "java";

    vm.role = {id:1,type:'Lead'};
    vm.stream = {id: 1, type: 'Java' };



    vm.candidateCreated = new Date();

    vm.minDate = new Date(
        vm.candidateCreated.getFullYear()-1,
        vm.candidateCreated.getMonth(),
        vm.candidateCreated.getDate());

    vm.maxDate = new Date(
        vm.candidateCreated.getFullYear()+1,
        vm.candidateCreated.getMonth(),
        vm.candidateCreated.getDate());


    vm.driveDate = angular.copy(vm.candidateCreated);

    console.log(vm.candidateCreated);
    console.log(vm.driveDate);
    vm.Open = false;




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
		//$modalInstance.close(row.entity);
        $mdDialog.hide();
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
		//$modalInstance.close(row.entity);
        $mdDialog.hide();
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


app.config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
        return date ? moment(date).format('DD-MM-YYYY') : '';
    };

    $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'DD-MM-YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };
});
