import axios from 'axios';
import {ROUTES} from '../Constants';

export async function imageProfile(data){
    try{
        let res = await axios.post(ROUTES.UPLOADIMAGE, data);
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