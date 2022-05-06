import axios from "axios"
import { API } from "../../../../config"

export const updatePasswordAPI = ( userId, token, data ) => {
    return axios({
        url:`${API}/change/password/${userId}`,
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: data
    })
}