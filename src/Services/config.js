import axios from 'axios';
import {ROUTES} from '../Constants';

export async function general(){
    try{
        let res = await axios.get(ROUTES.CONFIG_GENERAL);
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function language(){
    try{
        let res = await axios.get(ROUTES.CONFIG_LANGUAGE);
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function tracks(){
    try{
        let res = await axios.get(ROUTES.CONFIG_TRACKS);
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export function handler(err) {
    if (err.response && err.response.data)
    {
        return err.response.data;
    }
    console.log('err', err)
    return err;
}