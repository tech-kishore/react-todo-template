import { apiClient } from "../api/ApiClient";

export const basicAuthApi
    =(token)=>apiClient.get('/basicauth',{
        headers:{
            Authorization: token
        }
    })

export const jwtAuthApi
    =(username,password)=>apiClient.post('/authenticate',{username,password})