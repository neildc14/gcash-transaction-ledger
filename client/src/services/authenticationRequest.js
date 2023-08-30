import HTTPRequest, { HttpPost } from "./HTTPRequest";
export default class AuthenticationRequest extends HTTPRequest {
  constructor() {
    super();

    this.signup_uri = import.meta.env.VITE_REACT_APP_SIGNUP_URI;
    this.login_uri = import.meta.env.VITE_REACT_APP_LOGIN_URI;
  }

  async SignUp(credentials) {
    const httpPost = new HttpPost();
    return await httpPost.request(
      `${this.endpoint}${this.signup_uri}`,
      credentials
    );
  }

  async Login(credentials) {
    const httpPost = new HttpPost();
    return await httpPost.request(
      `${this.endpoint}${this.login_uri}`,
      credentials
    );
  }
}
