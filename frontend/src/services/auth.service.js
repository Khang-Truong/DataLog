import axios from 'axios';

const API_URL = 'http://localhost:8000/api'


class AuthService {
    async getDatabases() {
        return axios.get(API_URL + '/get-dbs')
    }

    async getCurrentUser() {
        return axios.get(API_URL + '/users/me/')
    }


}

export default new AuthService();
