import axios from "axios";

export const helpHttp = () => {
  const customAxios = (endpoint, options) => {
    const defaultHeaders = {
      accept: "application/json",
    };

    // Con axios no necesitamos serializar los datos

    options.method = options.method || "GET";
    options.headers = options.headers
      ? { ...options.headers, ...defaultHeaders }
      : defaultHeaders;
    // options.data = JSON.stringify(options.data) || false;
    options.data = options.data || false;

    if (!options.data) delete options.data;

    console.log(options);
    return axios(endpoint, options)
      .then((res) => {
        console.log(res);
        return {
          status: res.status,
          user: res.data.user || null,
          data: res.data.data || null,
          token: res.data.token || null,
        };
      })
      .catch((e) => {
        // console.log(e.response);
        return Promise.reject({
          err: true,
          status: e.response.status || "00",
          statusText: e.response.statusText || "Ocurrio un error",
        });
      });
  };

  const get = (url, options = {}) => customAxios(url, options);

  const post = (url, options = {}) => {
    options.method = "POST";
    return customAxios(url, options);
  };

  const put = (url, options = {}) => {
    options.method = "PUT";
    return customAxios(url, options);
  };

  const del = (url, options = {}) => {
    options.method = "DELETE";
    return customAxios(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
