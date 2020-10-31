import axios from 'axios';
import {ROUTES} from '../Constants';

export async function createLesson(data){
    try{
        let res = await axios.post(ROUTES.LESSON, data);
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function loadCover(data){
    try{
        let res = await axios.post(ROUTES.LOAD_COVER, data);
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function loadMedia(data){
    console.log(data)
    try{
        let res = await axios({
           url    : ROUTES.LOAD_MEDIA,
           method : 'POST',
           data   : data,
           headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data'
                    }
                })
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export function handler(err) {
    console.log('err', err)
    if (err.response && err.response.data)
    {
        return err.response.data;
    }
    console.log('err', err)
    return err;
}