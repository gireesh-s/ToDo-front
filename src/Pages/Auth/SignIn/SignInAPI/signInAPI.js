import axios from "axios"
import { API } from "../../../../config"

export const signInAPI = (data) => {
  return axios({
      method: "POST",
      url: `${API}/login`,
      data: data
  }).then((res) => {
      return res;
  }).catch((err) => {
      console.log(err)
      return err;
  })
}

export const userAuth = (data, next) => {
  if (typeof window !== undefined) {
      localStorage.setItem('jwt',JSON.stringify(data));
      next();
  }
}

export const isUndefined = (next) => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("jwt") === undefined) {
      localStorage.removeItem("jwt");
      next();
      return axios({
        method: "GET",
        url: `${API}/logout`,
      })
        .then((res) => {
          console.log("Signout", res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else return true
  }
};

export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const signoutApi = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");
    next();
    return axios({
      method: "GET",
      url: `${API}/logout`,
    })
      .then((res) => {
        console.log("Signout", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

//Clear local storage
export const clearJwt = () => {
  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");
  }
};