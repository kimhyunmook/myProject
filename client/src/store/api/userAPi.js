import axios from "axios";

export const fetchUser = async (body) => {
    return axios
        .post('/api/users/auth', body.payload)
        .then(res => res.data)
        .catch(error => error);
}

export const login = async (body) => {
    return axios
        .post('/api/users/login', body.payload)
        .then(res => res.data)
        .catch(error => error);
}

export const logout = async (body) => {
    return axios
        .post('/api/users/logout', body.payload)
        .then(res => res.data)
        .catch(error => error)
}

export const userEdit = async (body) => {
    return axios
        .post('/api/users/edit', body.payload)
        .then(res => res.data)
        .catch(error => error)
}

export const userDelete = async (body) => {
    return axios
        .post('/api/users/delete', body.payload)
        .then(res => res.data)
        .catch(error => error);
}

export const register = async (body) => {
    return axios
        .post(`/api/users/signup`, body.payload)
        .then(res => res.data)
        .catch(error => error);
}