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

export async function verifyNickname(data){
    try{
        let res = await axios.post(ROUTES.VERIFYNICK, data);
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function profileData(data){
    try{
        let res = await axios.post(ROUTES.PROFILEDATA, data);
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function adjustProfile(data){
    try{
        let res = await axios.post(ROUTES.ADJUSTPROFILE, data);
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function tagsTrend(){
    try{
        let res = await axios.get(ROUTES.TAGSTREND);
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function tagsAll(){
    try{
        let res = await axios.get(ROUTES.TAGSALL);
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function myTags(){
    try{
        let res = await axios.get(ROUTES.MYTAGS);
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
    return err;
}