import axios from "axios";
export const request = axios.create({
  baseURL: process.env.BASEURL,
  timeout: 5000,
});

request.defaults.withCredentials = true;

request.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  function (response) {
    console.log(response);

    return response;
  },
  function (error) {
    //controller 만들어야함
    console.log(error);
    return Promise.reject(error);
  }
);
