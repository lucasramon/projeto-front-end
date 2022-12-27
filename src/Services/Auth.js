import { TstAPI } from "./BaseApi";

const baseURL = process.env.REACT_APP_API_URL;

export const login = async (email, password) => {
    console.log(process.env)
    return TstAPI.post(`${baseURL}/auth/signin`, { email, password }).then(response => {
        const { data } = response;
        localStorage.setItem('token', data.user.token);
        return data;
    })
}

export const signUp = async (email, name, password) => {
    return TstAPI.post(`${baseURL}/auth/signup`, { email, name, password }).then(response => {
        const { data } = response;
        localStorage.setItem('token', data.user.token);
        return data;
    })
}

export const getUserInfo = () => {
    return TstAPI.get(`${baseURL}/auth/me`).then(response => {
        const { data } = response;
        return data;
    })
}