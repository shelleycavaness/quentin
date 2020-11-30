import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:3000/api/"
    // baseURL: "http://localhost:1337/"

})

export const addAuth = (token: string)  => {
    // instance.defaults.headers.common["Authorization"] = "Bearer " + token;
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default instance;