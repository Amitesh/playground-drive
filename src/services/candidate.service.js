export default class CandidateService {
    constructor($http, $q) {
        'ngInject';

        this.$http = $http;
        this.$q = $q;

        this.data = {};
        this.fetched = false;
    }

    saveAll(data) {
        return this.$http.post('http://localhost:3000/candidate/create-with-drive', data);
    }
}