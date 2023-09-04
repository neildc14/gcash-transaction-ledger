import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  credentials: "include",
});

export default class HTTPRequest {
  constructor() {
    this.endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;
  }
}

export class HttpGet {
  async request(endpoint, headers) {
    return await axiosInstance.get(endpoint, { headers });
  }
}

export class HttpPost {
  async request(endpoint, data, headers) {
    return await axiosInstance.post(endpoint, data, { headers });
  }
}

export class HttpPut {
  async request(endpoint, data, headers) {
    return await axiosInstance.put(endpoint, data, { headers });
  }
}

export class HttpDelete {
  async request(endpoint, headers) {
    return await axiosInstance.delete(endpoint, { headers });
  }
}
