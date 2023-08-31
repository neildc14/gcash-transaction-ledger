import axios from "axios";

export default class HTTPRequest {
  constructor() {
    this.endpoint = import.meta.env.VITE_REACT_APP_ENDPOINT;
  }
}

export class HttpGet {
  async request(endpoint, headers) {
    return await axios.get(endpoint, { headers });
  }
}

export class HttpPost {
  async request(endpoint, data, headers) {
    return await axios.post(endpoint, data, { headers });
  }
}

export class HttpPut {
  async request(endpoint, data, headers) {
    return await axios.put(endpoint, data, { headers });
  }
}

export class HttpDelete {
  async request(endpoint, headers) {
    return await axios.delete(endpoint, { headers });
  }
}
