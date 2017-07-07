export default class MetaInfoService {
    constructor($http, $q) {
        'ngInject';

        this.$http = $http;
        this.$q = $q;
        this.info = {};
        this.info.streams = [];
        this.info.roles = [];
        this.info.participated = [];
        this.info.status = [];

        this.fetched = false;
    }
    getInfo() {
        let deferred = this.$q.defer();
        let me = this;

        if(this.fetched){
            deferred.resolve(me.info);
        }else{
            this.$http.get('http://localhost:3000/meta-info')
                .then(function success(res){
                    me.fetched = true;
                    me.info.streams = res.data.streams;
                    me.info.roles = res.data.roles;
                    me.info.participated = res.data.participated;
                    me.info.status = res.data.status;
                    deferred.resolve(me.info);
                }, function failure(res){
                    deferred.reject(res);
                });
        }

        return deferred.promise;
    }
}