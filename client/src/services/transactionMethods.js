import axios from "axios";
const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

export const postTransaction = async (data) => {
  return axios.post(ENDPOINT, data);
};
