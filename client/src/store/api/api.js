import axios from "axios";

function getUrl(body) {
  const url = body.payload.url;
  return url;
}

export const commonAPi = {
  post: async (body) => {
    const url = getUrl(body);
    return axios
      .post(`${process.env.REACT_APP_DB_HOST}/api${url}`, body.payload)
      .then((res) => res.data)
      .catch((error) => error);
  },
  get: async (body) => {
    const url = getUrl(body);
    return axios
      .get(`${process.env.REACT_APP_DB_HOST}/api${url}`, body.payload)
      .then((res) => res.data)
      .catch((error) => error);
  },
};

export const boardApi = {
  list: async (body) => {
    const url = getUrl(body);
    return axios
      .get(`${process.env.REACT_APP_DB_HOST}/api/board/list${url}`, body.payload)
      .then((res) => res.data)
      .catch((error) => error);
  },
  write: async (body) => {
    const url = getUrl(body);
    return axios
      .post(`${process.env.REACT_APP_DB_HOST}/api/board${url}/write`, body.payload)
      .then((res) => res.data)
      .catch((error) => error);
  },
  view: async (body) => {
    return axios
      .post(`${process.env.REACT_APP_DB_HOST}/api/board/${body.payload.name}/contents/${body.payload.w_num}`)
      .then((res) => res.data)
      .catch((error) => error);
  },
  modify: async (body) => {
    return axios
      .post(
        `${process.env.REACT_APP_DB_HOST}/api/board/${body.payload.name}/modify/${body.payload.w_id}`,
        body.payload
      )
      .then((res) => res.data)
      .catch((error) => error);
  },
  delete: async (body) => {
    let target;
    if (body.payload.w_num !== undefined) target = body.payload.w_num;
    else target = body.payload.w_id;

    return axios
      .post(`${process.env.REACT_APP_DB_HOST}/api/board/${body.payload.name}/delete/${target}`, body.payload)
      .then((res) => res.data)
      .catch((error) => error);
  },
};
