export default class MetaInfoService {
    constructor($http, $q) {
        'ngInject';

        this.$http = $http;
        this.$q = $q;

        this.data = {};

        // this.info = {};
        // this.info.streams = [];
        // this.info.roles = [];
        // this.info.participated = [];
        // this.info.status = [];
        // this.info.drives = [];
        // this.info.testTypes = [];

        this.fetched = false;
    }
    getInfo() {
        let deferred = this.$q.defer();
        let me = this;

        if(this.fetched){
            deferred.resolve(me.data);
        }else{
            this.$http.get('http://localhost:3000/meta-info')
                .then(function success(res){
                    me.fetched = true;
                    me.data = res.data;

                    // me.info.streams = res.data.metaInfo.streams;
                    // me.info.roles = res.data.metaInfo.roles;
                    // me.info.participated = res.data.metaInfo.participated;
                    // me.info.status = res.data.metaInfo.status;
                    // me.info.drives = res.data.drives;
                    // me.info.testTypes = res.data.testTypes;

                    deferred.resolve(me.data);
                }, function failure(res){
                    deferred.reject(res);
                });
        }

        return deferred.promise;
    }
}