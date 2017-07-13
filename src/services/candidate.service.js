import config from '../config.json';

export default class CandidateService {
    constructor($http, $q) {
        'ngInject';

        this.$http = $http;
        this.$q = $q;

        this.data = {};
        this.fetched = false;
    }

    saveAll(data) {
        return this.$http.post(config.apiUrl + '/candidate/create-with-drive', data);
    }
}