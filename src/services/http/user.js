import BaseServiceHttp from "./BaseService";

class UserHttp extends BaseServiceHttp {
  constructor(id) {
    const resource = "/user";
    const relationship = {};
    const baseURL = process.env.VUE_APP_ROOT_API;
    super(id, resource, relationship, baseURL);
  }
}

export default (id) => new UserHttp(id);
