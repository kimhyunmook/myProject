import axios from "axios";
const url = `${process.env.REACT_APP_DB_HOST}/api`


export const fetchUser = async (body) => {
    return axios
        .post(`${url}/users/auth`, body.payload)
        .then(res => res.data)
        .catch(error => error);
}

export const login = async (body) => {
    return axios
        .post(`${url}/users/login`, body.payload)
        .then(res => res.data)
        .catch(error => error);
}

export const logout = async (body) => {
    return axios
        .post(`${url}/users/logout`, body.payload)
        .then(res => res.data)
        .catch(error => error)
}

export const userEdit = async (body) => {
    return axios
        .post(`${url}/users/edit`, body.payload)
        .then(res => res.data)
        .catch(error => error)
}

export const userDelete = async (body) => {
    return axios
        .post(`${url}/users/delete`, body.payload)
        .then(res => res.data)
        .catch(error => error);
}

export const register = async (body) => {
    return axios
        .post(`${url}/users/signup`, body.payload)
        .then(res => res.data)
        .catch(error => error);
}