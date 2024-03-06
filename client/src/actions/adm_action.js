import axios from "axios"
import { api } from './type'
// const url = `${process.env.REACT_APP_DB_HOST}/api`
const url  = `${window.location.protocol+window.location.hostname}:3100/api`

export function adminAction(dataSumbit) {
    const request = axios.post(`/api/adm/${dataSumbit.url}`, dataSumbit)
        .then(response => response.data)
    return {
        type: dataSumbit.url,
        payload: request
    }
}

export function needDownLoad(dataSubmit) {
    const request = axios.get(`${url}/setting/down`, dataSubmit)
        .then(response => response.data)
    return {
        type: 'Need Download',
        payload: request
    }
}

export function settingDownLoad(dataSubmit) {
    const request = axios.post(`${url}/setting/${dataSubmit.url}`, dataSubmit)
        .then(response => response.data)
    return {
        type: 'Setting Download',
        payload: request
    }
}

export function basicSetting(dataSubmit) {
    const request = axios.post(`${url}/setting/${dataSubmit.url}`, dataSubmit)
        .then(response => response.data)
    return {
        type: 'Setting',
        payload: request
    }
}

export function admDelete(dataSubmit) {
    const request = axios.delete(`${url}/setting/${dataSubmit.url}`, dataSubmit)
        .then(response => response.data)
    return {
        type: 'delete',
        payload: request
    }
}