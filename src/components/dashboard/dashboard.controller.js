import header from './grid-header.html';

export default function dashboardController($scope, $http, $state, DashboardService, uiGridConstants) {
    'ngInject';

    let vm = $scope;

    vm.grid = {
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        enableColumnMenus: false,// remove sort icons
        multiSelect: false,
        enableSorting: false,
        enableFiltering: true,
        enableGridMenu: false,
        enableColumnResize: true,
        noUnselect: true,
        rowHeight: 100,
        exporterCsvFilename: 'playground-drive-list.csv'
    };

    $scope.grid.onRegisterApi = function (gridApi) {
        $scope.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            if(row.isSelected){
                DashboardService.setSelectedRow(row);
                $state.go('app.dashboard.candidate', {row: null});
            }
        });
    };

    vm.grid.data = [];
    vm.grid.headerTemplate = header;

    vm.grid.superColDefs = [{
        name: 'drive',
        displayName: 'Drive'
    }, {
        name: 'candidate',
        displayName: 'Candidate'
    }, {
        name: 'tests[0]',
        displayName: 'Mettl'
    }, {
        name: 'tests[1]',
        displayName: 'Mini PG'
    }, {
        name: 'tests[2]',
        displayName: 'PG'
    }, {
        name: 'hiring-status',
        displayName: 'Hiring Status'
    }];

    vm.grid.columnDefs = [
        // Drive Details
        {
            field: 'drive.name',
            superCol: 'drive',
            displayName: "Name",
            cellTooltip: function (row) {
                return row.entity.drive.name + ' on ' + row.entity.drive.scheduledOn;
            },
            cellTemplate: '<div class="ui-grid-cell-contents drive left-gap" title="TOOLTIP">' +
                    '<span class="name">{{row.entity.drive.name}}</span><br>' +
                    '<span class="scheduled-on">{{row.entity.drive.scheduledOn}}</span>' +
                '</div>'
        },
        {
            field: 'drive.scheduledOn',
            superCol: 'drive',
            displayName: "Scheduled On",
            visible: false
        },
        {
            field: 'drive.participated',
            superCol: 'drive',
            displayName: "Came",
            cellTemplate: '<div class="ui-grid-cell-contents drive text-center" title="TOOLTIP">' +
                '<span class="participated">{{row.entity.drive.participated}}</span>'+
            '</div>'
        },
        // Candidate Details
        {
            field: 'candidate.firstname',
            superCol: 'candidate',
            displayName: "Name",
            width: '*',
            cellTooltip: function (row) {
                var tip = row.entity.candidate.firstname + ' ' + row.entity.candidate.lastname;
                tip = tip + (row.entity.candidate.email ? '\n' + row.entity.candidate.email : '');
                tip = tip + (row.entity.candidate.phone ? '\n' + row.entity.candidate.phone : '');

                return tip;
            },
            cellTemplate: '<div class="ui-grid-cell-contents candidate left-gap" title="TOOLTIP">' +
                    '<span class="name">{{row.entity.candidate.firstname}} {{row.entity.candidate.lastname}}</span><br>' +
                    '<span class="email"><a href="mailto:{{row.entity.candidate.email}}">{{row.entity.candidate.email}}</a></span><br>' +
                    '<span class="phone">{{row.entity.candidate.phone}}</span>' +
                '</div>'
        },
        {
            field: 'candidate.lastname',
            superCol: 'candidate',
            displayName: "Last name",
            visible: false
        },
        {
            field: 'candidate.email',
            superCol: 'candidate',
            displayName: "Email",
            visible: false
        },
        {
            field: 'candidate.phone',
            superCol: 'candidate',
            displayName: "Phone",
            visible: false
        },
        {
            field: 'candidate.stream',
            superCol: 'candidate',
            displayName: "Stream",
            cellTemplate: '<div class="ui-grid-cell-contents candidate text-center" title="TOOLTIP">' +
            '<span class="stream">{{row.entity.candidate.stream}}</span>'+
            '</div>'
        },
        {
            field: 'candidate.role',
            superCol: 'candidate',
            displayName: "Role",
            width: '90',
            cellTemplate: '<div class="ui-grid-cell-contents candidate text-center" title="TOOLTIP">' +
            '<span class="role">{{row.entity.candidate.role}}</span>'+
            '</div>'
        },

        // Mettl test detail
        {
            field: 'tests[0].participated',
            superCol: 'tests[0]',
            displayName: "Given",
            cellTemplate: '<div class="ui-grid-cell-contents test  text-center" title="TOOLTIP">' +
            '<span class="participated">{{row.entity.tests[0].participated}}</span>'+
            '</div>'
        },
        {
            field: 'tests[0].status',
            superCol: 'tests[0]',
            displayName: "Status",
            cellTemplate: '<div class="ui-grid-cell-contents test" title="TOOLTIP">' +
            '<span class="status">{{row.entity.tests[0].status}}</span>'+
            '</div>'
        },
        {
            field: 'tests[0].score',
            superCol: 'tests[0]',
            displayName: "Score",
            cellTemplate: '<div class="ui-grid-cell-contents test" title="TOOLTIP">' +
            '<span class="score">{{row.entity.tests[0].score}}</span>'+
            '</div>'
        },

        // Mini PG test detail
        {
            field: 'tests[1].participated',
            superCol: 'tests[1]',
            displayName: "Given",
            cellTemplate: '<div class="ui-grid-cell-contents test  text-center" title="TOOLTIP">' +
            '<span class="participated">{{row.entity.tests[1].participated}}</span>'+
            '</div>'
        },
        {
            field: 'tests[1].status',
            superCol: 'tests[1]',
            displayName: "Status",
            cellTemplate: '<div class="ui-grid-cell-contents test" title="TOOLTIP">' +
            '<span class="status">{{row.entity.tests[1].status}}</span>'+
            '</div>'
        },
        {
            field: 'tests[1].score',
            superCol: 'tests[1]',
            displayName: "Score",
            cellTemplate: '<div class="ui-grid-cell-contents test" title="TOOLTIP">' +
            '<span class="score">{{row.entity.tests[1].score}}</span>'+
            '</div>'
        },

        // PG test detail
        {
            field: 'tests[2].participated',
            superCol: 'tests[2]',
            displayName: "Given",
            cellTemplate: '<div class="ui-grid-cell-contents test  text-center" title="TOOLTIP">' +
            '<span class="participated">{{row.entity.tests[2].participated}}</span>'+
            '</div>'
        },
        {
            field: 'tests[2].status',
            superCol: 'tests[2]',
            displayName: "Status",
            cellTemplate: '<div class="ui-grid-cell-contents test" title="TOOLTIP">' +
            '<span class="status">{{row.entity.tests[2].status}}</span>'+
            '</div>'
        },
        {
            field: 'tests[2].score',
            superCol: 'tests[2]',
            displayName: "Score",
            cellTemplate: '<div class="ui-grid-cell-contents test" title="TOOLTIP">' +
            '<span class="score">{{row.entity.tests[2].score}}</span>'+
            '</div>'
        },

        // Hiring Status
        {
            field: 'hiringStatus.status',
            superCol: 'hiring-status',
            displayName: "Status",
            cellTemplate: '<div class="ui-grid-cell-contents hiring-status text-center" title="TOOLTIP">' +
            '<span class="status">{{row.entity.hiringStatus.status}}</span>'+
            '</div>'
        },
        {
            field: 'hiringStatus.comment',
            superCol: 'hiring-status',
            displayName: "Comment",
            width: '*',
            cellTemplate: '<div class="ui-grid-cell-contents hiring-status left-gap" title="TOOLTIP">' +
            '<span class="comment">{{row.entity.hiringStatus.comment}}</span>'+
            '</div>'
        }
    ];


    DashboardService.get().then(function success(data) {
        console.log('in success ', data);

        vm.grid.data = data;

    }, function failure(error) {
        console.log('in failure ', error);
    });

    $scope.refresh = function(){
        $state.go('app.dashboard', {}, {reload: true});
    };

    $scope.export = function(){
        var myElement = angular.element(document.querySelectorAll(".custom-csv-link-location"));
        $scope.gridApi.exporter.csvExport( /* row */ 'visible', /* column */  'all', myElement );
    }
}