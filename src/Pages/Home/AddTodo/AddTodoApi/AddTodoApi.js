import axios from "axios";
import { API } from '../../../../config'

export const postToDoAPI = ( userId, token, data, ) => {
    return axios({
        method: "POST",
        url: `${API}/post/todo/${userId}`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: data
    })
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
}

export const getToDoAPI = (userId, token) => {
    return axios({
        method: "GET",
        url: `${API}/get/todo/${userId}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then((res) => {
        return res
    })
    .catch((err) => {
        return err
    })
}

export const deleteToDoAPI = ( userId, todoId, token) => {
    return axios({
        method: "DELETE",
        url:`${API}/delete/todo/${userId}/${todoId}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then((res)=>{
        return res
    })
    .catch((err)=>{
        return err
    })
}