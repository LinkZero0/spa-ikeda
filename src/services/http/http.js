import axios from "axios";
import router from "../../router";
import store from "../../store";
export default class Http {
  baseURL;

  constructor(baseURL) {
    this.baseURL = baseURL;
    return this.create();
  }

  create() {
    const http = axios.create({
      baseURL: this.baseURL,
      timeout: 120000,
      headers: { "Content-Type": "application/json" },
    });

    http.interceptors.request.use(
      (config) => {
        // config.params = paramInterceptors(config);

        const token = store.getters.getToken;
        if (token) config.headers.Authorization = `${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    http.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response !== undefined) {
          if (error.response.status === 401) {
            store.dispatch("logout");
            router.push("/login");
          }
        }
        return Promise.reject(error);
      }
    );

    return http;
  }
}
// const http = axios.create({
//   baseURL: process.env.VUE_APP_ROOT_API,
//   timeout: 120000,
//   headers: { "Content-Type": "application/json" },
// });

// export default http;
