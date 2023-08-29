import axios from "axios";

export default class HTTPRequest {
  constructor() {
    this.endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;
  }
}

export class HttpGet {
  async request(endpoint) {
    return await axios.get(endpoint);
  }
}

export class HttpPost {
  async request(endpoint, data) {
    return await axios.post(endpoint, data);
  }
}

export class HttpPut {
  async request(endpoint, data) {
    return await axios.put(endpoint, data);
  }
}

export class HttpDelete {
  async request(endpoint) {
    return await axios.delete(endpoint);
  }
}