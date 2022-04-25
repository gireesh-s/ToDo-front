import axios from "axios"
import { API } from "../../../config"

export const ProfileAPI = ( userId, token, data ) => {
    return axios({
        method:"GET",
        url:`${API}/read/profile/${userId}`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: data
    })
}

export const EditProfileAPI = (userId, token, data) => {
    return axios({
        method: "PUT",
        url:`${API}/edit/profile/${userId}`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: data
    })
}