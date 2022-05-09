import BaseServiceHttp from "./BaseService";

class MentorshipHttp extends BaseServiceHttp {
  constructor(id) {
    const resource = "/mentorship";
    const relationship = {};
    const baseURL = process.env.VUE_APP_ROOT_API;
    super(id, resource, relationship, baseURL);
  }
}

export default (id) => new MentorshipHttp(id);
