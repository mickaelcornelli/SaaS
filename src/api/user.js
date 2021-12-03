import axios from 'axios';
import {config} from '../config';

export const saveUser = (data)=>{
    return axios.post(config.api_url+'/api/v1/user/add', data)
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                console.log(err);
            })
}

export const loginUser = (data)=>{
    return axios.post(config.api_url+'/api/v1/user/login', data)
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                console.log(err);
            })
}


export const forgotPassword = (data)=>{
    return axios.post(config.api_url+'/api/v1/user/forgot', data)
            .then((response)=>{
                return response.data;
            })
            .catch((err)=>{
                console.log(err);
            })
}