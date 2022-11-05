import axios from 'axios';

const API_URL = 'http://localhost:8000/api'


class AuthService {
    async getDatabases() {
        return axios.get(API_URL + '/get-dbs')
    }

    async getCurrentUser() {
        const token = localStorage.getItem('token');
        const tokenObj = JSON.parse(token)

        return axios.get(API_URL + `/users/me/`, {
            headers: {
                'Authorization': `Bearer ${tokenObj.access_token}`
            }
        })
    }


}

export default new AuthService();
