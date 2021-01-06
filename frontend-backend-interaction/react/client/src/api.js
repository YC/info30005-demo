import axios from "axios";
const BASE_URL = 'http://localhost:3000'

export function getMessages() {
  return axios.get(BASE_URL).then((response) => {
    return response.data;
  });
}

export function sendMessage(message) {
  return axios.post(BASE_URL, { message }).then();
}
