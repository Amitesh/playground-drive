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
        noUnselect: true
    };

    $scope.grid.onRegisterApi = function (gridApi) {
        $scope.gridApi = gridApi;
        gridApi.selection.on.rowSelectionChanged($scope, function (row) {
            var msg = 'row selected ' + row.isSelected;
            //Open your link here.
            console.log(msg, row);
            if(row.isSelected){
                // open the edit pannel
                // var a = angular.copy(row);
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
            displayName: "Name"
        },
        {
            field: 'drive.scheduledOn',
            superCol: 'drive',
            displayName: "Scheduled On"
        },
        // Candidate Details
        {
            field: 'candidate.firstname',
            superCol: 'candidate',
            displayName: "First name"
        },
        {
            field: 'candidate.lastname',
            superCol: 'candidate',
            displayName: "Last name"
        },
        {
            field: 'candidate.email',
            superCol: 'candidate',
            displayName: "Email"
        },
        {
            field: 'candidate.phone',
            superCol: 'candidate',
            displayName: "Phone"
        },
        {
            field: 'candidate.stream',
            superCol: 'candidate',
            displayName: "Stream"
        },
        {
            field: 'candidate.role',
            superCol: 'candidate',
            displayName: "Role"
        },

        // Mettl test detail
        {
            field: 'tests[0].participated',
            superCol: 'tests[0]',
            displayName: "Participated"
        },
        {
            field: 'tests[0].status',
            superCol: 'tests[0]',
            displayName: "Status"
        },
        {
            field: 'tests[0].score',
            superCol: 'tests[0]',
            displayName: "Score"
        },

        // Mini PG test detail
        {
            field: 'tests[1].participated',
            superCol: 'tests[1]',
            displayName: "Participated"
        },
        {
            field: 'tests[1].status',
            superCol: 'tests[1]',
            displayName: "Status"
        },
        {
            field: 'tests[1].score',
            superCol: 'tests[1]',
            displayName: "Score"
        },

        // PG test detail
        {
            field: 'tests[2].participated',
            superCol: 'tests[2]',
            displayName: "Participated"
        },
        {
            field: 'tests[2].status',
            superCol: 'tests[2]',
            displayName: "Status"
        },
        {
            field: 'tests[2].score',
            superCol: 'tests[2]',
            displayName: "Score"
        },

        // Hiring Status
        {
            field: 'hiringStatus.status',
            superCol: 'hiring-status',
            displayName: "Status"
        },
        {
            field: 'hiringStatus.comment',
            superCol: 'hiring-status',
            displayName: "Comment"
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
        $scope.gridApi.exporter.csvExport( /* row */ 'visible',  'all', myElement );
    }
}