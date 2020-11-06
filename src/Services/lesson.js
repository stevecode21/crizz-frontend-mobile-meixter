import axios from 'axios';
import {ROUTES} from '../Constants';

export async function listLesson(){
    try{
        let res = await axios.get(ROUTES.LIST_LESSON);
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function listLessonComments(id){
    try{
        let res = await axios.get(ROUTES.COMMENTS_LESSON, {
          params: {
            id: id
          }
        });
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function sendComment(data){
    try{
        let res = await axios.post(ROUTES.COMMENTS_LESSON, data);
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function freeze(data){
    try{
        let res = await axios.put(ROUTES.FREEZE_LESSON, data);
        return res.data;
    }catch (e) {
        throw handler(e)
    }
}

export async function listLessonByTags(){
    try{
        let res = await axios.get(ROUTES.ALL_LESSON, {
          params: {
            search: '',
            lang: '5f75f04bf362c0d181a8a207'
          }
        }); 
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
    return err;
}