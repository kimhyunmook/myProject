import axios from "axios"

export function adminAction(dataSumbit) {
    const request = axios.post(`/api/adm/${dataSumbit.url}`, dataSumbit)
        .then(response => response.data)
    return {
        type: dataSumbit.url,
        payload: request
    }
}

export function needDownLoad(dataSubmit) {
    const request = axios.get(`/api/setting/down`, dataSubmit)
        .then(response => response.data)
    return {
        type: 'Need Download',
        payload: request
    }
}

export function settingDownLoad(dataSubmit) {
    const request = axios.post(`/api/setting/${dataSubmit.url}`, dataSubmit)
        .then(response => response.data)
    return {
        type: 'Setting Download',
        payload: request
    }
}

export function basicSetting(dataSubmit) {
    const request = axios.post(`/api/setting/${dataSubmit.url}`, dataSubmit)
        .then(response => response.data)
    return {
        type: 'Setting',
        payload: request
    }
}

export function admDelete(dataSubmit) {
    const request = axios.delete(`/api/setting/${dataSubmit.url}`, dataSubmit)
        .then(response => response.data)
    return {
        type: 'delete',
        payload: request
    }
}