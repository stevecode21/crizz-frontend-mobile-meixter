import axios from 'axios';
import {ROUTES} from '../Constants';

export async function verify(data){
    try{
        let res = await axios.post(ROUTES.VERIFY, data);
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function login(data){
    try{
        let res = await axios.post(ROUTES.LOGIN, data);
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function account(){
    try{
        let res = await axios.get(ROUTES.ACCOUNT);
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export function setAuthorization(token){
    axios.defaults.headers.common["Authorization"] = token;
}

export function deleteAuthorization(){
    delete axios.defaults.headers.common["Authorization"];
}


export function handler(err) {
    console.log('err', err)
    if (err.response && err.response.data)
    {
        return err.response.data;
    }
    return {'message': err['Error']};
}