import axios from 'axios';

const API_URL = 'http://localhost:8000/api/'


class AuthService {
    async getDatabases() {
        return axios.get(API_URL + 'get-dbs')
    }

    async selectedDB(db) {
        return axios
            .post(API_URL + "selected-db", {
                db
            })
    }

    async getUsers(db) {
        return axios.get(API_URL + 'get-users', { db })
    }

    async logout() {
        localStorage.removeItem("user");
    }
}

export default new AuthService();
