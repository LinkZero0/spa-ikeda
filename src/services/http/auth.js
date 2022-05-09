import BaseServiceHttp from "./BaseService";

class AuthHttp extends BaseServiceHttp {
  constructor(id) {
    const resource = "/auth";
    const relationship = { };
    const baseURL = process.env.VUE_APP_ROOT_API;
    console.log(baseURL);
    super(id, resource, relationship, baseURL);
  }
}

export default (id) => new AuthHttp(id);
