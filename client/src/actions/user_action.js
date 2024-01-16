import axios from "axios";
import { user_auth, user_login } from "./type";

export function registerUser(dataSubmit = {}) {
    const request = axios.post('/api/users/signUp', dataSubmit)
        .then(response => response.data)
    return {
        type: 'register_user',
        payload: request
    }
}

export function loginUser(dataSubmit) {
    const request = axios.post('/api/users/login', dataSubmit)
        .then(response => response.data)
    return {
        type: user_login,
        payload: request
    }
}

export function auth(dataSubmit) {
    const request = axios.get('/api/users/auth', dataSubmit)
        .then(response => response.data)

    return {
        type: user_auth,
        payload: request
    }
}

export function edit(dataSubmit) {
    const request = axios.put('/api/users/edit', dataSubmit)
        .then(response => response.data)
    return {
        type: 'user_edit',
        payload: request
    }
}

export function deleteUser(dataSubmit) {
    const request = axios.delete('/api/users/delete', dataSubmit)
        .then(response => response.data)
    return {
        type: 'user_delete',
        payload: request
    }
}