import axios from "axios";
import {getLocalStorageUser}  from "./localStorage";
const customFetch = axios.create({
    baseURL:"https://jobster-server.onrender.com/api/v1/",
});

customFetch.interceptors.request.use((config) =>{
    config.headers["Content-type"] = "application/json";
    config.withCredentials = true;
    const user = getLocalStorageUser();
    if(user){
        config.headers["Authorization"] = `Bearer ${user.token}`
    }
    return config;
},
(error) => {
    return Promise.reject(error);
})

export default customFetch;