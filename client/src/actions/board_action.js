import axios from 'axios'

export function galleryWriteBoard(dataSubmit, config) {
    const request = axios.post(`/api/board/${config.name}/galleryWrite`, dataSubmit, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        .then(response => response.data)
    return {
        type: 'galleryWrite_board',
        payload: request
    }
}



export function lookContent(dataSubmit) {
    const request = axios.post(`/api/board/${dataSubmit.name}/contents/${dataSubmit.w_num}`)
        .then(response => response.data)
    return {
        type: 'look_content',
        payload: request
    }
}

export function modify(dataSubmit, config) {
    const request = axios.post(`/api/board/${config.name}/modify/${config.w_num}`, dataSubmit)
        .then(request => request.data)
    return {
        type: 'modify_board',
        payload: request
    }
}

export function deleteContent(dataSubmit, config) {
    const request = axios.delete(`/api/board/list/${config.name}/delete/${config.w_num}`, dataSubmit)
        .then(request => request.data)
    return {
        type: 'delete_board',
        payload: request
    }
}

export function replyWrite(dataSubmit) {
    const request = axios.post(`/api/board/${dataSubmit.name}/replyWrite/${dataSubmit.w_num}`, dataSubmit)
        .then(request => request.data)
    return {
        type: 'reply',
        payload: request
    }
}

export function replyList(dataSubmit) {
    const request = axios.post(`/api/board/${dataSubmit.name}/reply/${dataSubmit.w_num}`, dataSubmit)
        .then(request => request.data)
    return {
        tpye: 'reply_list',
        payload: request
    }
}

export function replyDelete(dataSubmit) {
    const request = axios.delete(`/api/board/${dataSubmit.name}/replyDelete/${dataSubmit.w_id}`, dataSubmit)
        .then(request => request.data)
    return {
        tpye: 'reply_delete',
        payload: request
    }
}