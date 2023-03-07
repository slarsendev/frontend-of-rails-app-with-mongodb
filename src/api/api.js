import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3001';
const HEADERS = {
  headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin' : '*',
  }
}

export const getAPICall = (url) => {
  return axios.get(url, HEADERS);
}

export const postAPICall = (url, data) => {
  return axios.post(url, data);
}

export const putAPICall = (url, data) => {
  return axios.put(url, data);
}

export const deleteAPICall = (url) => {
  return axios.delete(url);
}
