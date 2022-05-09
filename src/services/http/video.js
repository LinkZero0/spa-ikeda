import BaseServiceHttp from "./BaseService";

class VideoHttp extends BaseServiceHttp {
  constructor(id) {
    const resource = "/video";
    const relationship = {};
    const baseURL = process.env.VUE_APP_ROOT_API;
    super(id, resource, relationship, baseURL);
  }
}

export default (id) => new VideoHttp(id);
