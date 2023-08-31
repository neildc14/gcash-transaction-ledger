import HTTPRequest, { HttpGet } from "./HTTPRequest";

export default class TotalRequest extends HTTPRequest {
  constructor() {
    super();
    this.uri = import.meta.env.VITE_REACT_APP_TOTAL_URI;
  }

  async getTotal({ headers }) {
    const httpGet = new HttpGet();
    const response = await httpGet.request(
      `${this.endpoint}${this.uri}`,
      headers
    );
    return response.data;
  }
}
