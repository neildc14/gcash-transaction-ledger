import HTTPRequest, {
  HttpGet,
  HttpPut,
  HttpDelete,
  HttpPost,
} from "./HTTPRequest";

export default class TransactionRequest extends HTTPRequest {
  constructor() {
    super();
    this.uri = import.meta.env.VITE_REACT_APP_URI;
    this.resource_url = `${this.endpoint}${this.uri}`;
  }

  async getAllTransactions({ headers }) {
    const httpGet = new HttpGet();
    const response = await httpGet.request(this.resource_url, headers);
    console.log({ headers });
    return response.data;
  }

  async getTransaction(id, { headers }) {
    const httpGet = new HttpGet();
    const response = await httpGet.request(
      `${this.resource_url}${id}`,
      headers
    );

    return response.data;
  }

  async createTransaction(data, { headers }) {
    const httpPost = new HttpPost();
    return await httpPost.request(`${this.resource_url}`, data, headers);
  }

  async updateTransaction(data, id, { headers }) {
    const httpPut = new HttpPut();
    const response = await httpPut.request(
      `${this.resource_url}${id}`,
      data,
      headers
    );
    return response.data;
  }

  async deleteTransaction(id, { headers }) {
    const httpDelete = new HttpDelete();
    return await httpDelete.request(`${this.resource_url}${id}`, headers);
  }
}
