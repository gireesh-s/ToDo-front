import axios from "axios"
import { API } from "../../../../config"

export const signUpAPI = (data) => {
    return axios({
        method: "POST",
        url:`${API}/register`,
        data: data
    }).then((res) => {
        return res;
    }).catch((err) => {
        console.log(err);
        return err;
    })
}