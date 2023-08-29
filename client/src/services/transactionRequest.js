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
  }

  async getAllTransactions() {
    const httpGet = new HttpGet();
    const response = await httpGet.request(`${this.endpoint}${this.uri}`);
    return response.data;
  }

  async getTransaction(id) {
    const httpGet = new HttpGet();
    const response = await httpGet.request(`${this.endpoint}${this.uri}${id}`);
    return response.data;
  }

  async createTransaction(data) {
    const httpPost = new HttpPost();
    return await httpPost.request(`${this.endpoint}${this.uri}`, data);
  }

  async updateTransaction(data, id) {
    const httpPut = new HttpPut();
    const response = await httpPut.request(
      `${this.endpoint}${this.uri}${id}`,
      data
    );  
    return response.data;
  }

  async deleteTransaction(id) {
    const httpDelete = new HttpDelete();
    return await httpDelete.request(`${this.endpoint}${this.uri}${id}`);
  }
}
