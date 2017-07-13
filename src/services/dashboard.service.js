import config from '../config.json';

export default class DashboardService {
    constructor($http, $q) {
        'ngInject';

        this.$http = $http;
        this.$q = $q;
        this.selectedRow;
    }

    get() {
        let deferred = this.$q.defer();
        let me = this;


        this.$http.get(config.apiUrl + '/dashboard/show')
            .then(function success(res) {
                me.data = res.data;
                deferred.resolve(me.data);
            }, function failure(res) {
                deferred.reject(res);
            });
        return deferred.promise;
    }

    setSelectedRow(row){
        this.selectedRow = row;
    }

    getSelectedRow(){
        return this.selectedRow;
    }
}