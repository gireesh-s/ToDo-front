import axios from "axios"
import { API } from "../../../config"

export const putToDoAPI = ( userId, todoId, token, data, ) => {
    return axios({
        method: "PUT",
        url: `${API}/put/todo/${userId}/${todoId}`,
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

export const readToDoAPI = ( userId, todoId, token ) =>{
    return axios({
        method: "GET",
        url: `${API}/read/one/todo/${userId}/${todoId}`,
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