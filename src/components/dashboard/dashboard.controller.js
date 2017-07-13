export default function dashboardController($scope, $http, DashboardService){
    'ngInject';

    let vm = this;

    vm.grid = {
        enableRowSelection : true,
        enableRowHeaderSelection : false,
        enableColumnMenus: false,// remove sort icons
        multiSelect : false,
        enableSorting : false,
        enableFiltering : true,
        enableGridMenu : false
        /*,
         rowTemplate : "<div ng-click=\"grid.appScope.vm.editRow(grid, row)\" ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" ui-grid-cell></div>"*/
    };
    vm.grid.data = [];

    vm.grid.columnDefs = [
        {
            field: 'drive.name',
            categoryDisplayName: 'Drive',
            displayName:"Name"
        },
        {
            field: 'drive.scheduledOn',
            categoryDisplayName: 'Drive',
            displayName:"Scheduled On"
        },
        {
            field: 'candidate.firstname',
            categoryDisplayName: 'Candidate',
            displayName:"First name"
        },
        {
            field: 'candidate.lastname',
            categoryDisplayName: 'Candidate',
            displayName:"Last name"
        },
        {
            field: 'candidate.email',
            categoryDisplayName: 'Candidate',
            displayName:"Email"
        },
        {
            field: 'candidate.stream',
            categoryDisplayName: 'Candidate',
            displayName:"Stream"
        },
        {
            field: 'candidate.role',
            categoryDisplayName: 'Candidate',
            displayName:"Role"
        }
    ];


    DashboardService.get().then(function success(data){
        console.log('in success ', data);

        vm.grid.data = data;

        // $scope.candidates1 = [
        //     {
        //         "firstName": "Cox",
        //         "lastName": "Carney",
        //         "company": "Enormo",
        //         "employed": true
        //     },
        //     {
        //         "firstName": "Lorraine",
        //         "lastName": "Wise",
        //         "company": "Comveyer",
        //         "employed": false
        //     },
        //     {
        //         "firstName": "Nancy",
        //         "lastName": "Waters",
        //         "company": "Fuelton",
        //         "employed": false
        //     }
        // ];

    }, function failure(error){
        console.log('in failure ', error);
    });


}