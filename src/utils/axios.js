import axios from "axios";
import {getLocalStorageUser}  from "./localStorage";
const customFetch = axios.create({
    baseURL:"https://jobify-prod.herokuapp.com/api/v1/toolkit",
});

customFetch.interceptors.request.use((config) =>{
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