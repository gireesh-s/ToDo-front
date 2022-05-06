import axios from "axios"
import { API } from "../../../../config"

export const updateProfileAPI = ( userId, token, data, ) => {
    return axios({
        url: `${API}//edit/profile/${userId}`,
        method: "PUT",
        headers:{
            Authorization: `Bearer ${token}`,
        },
        data: data,
    })
}