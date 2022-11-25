import axios from "axios";
import { Cookies } from "react-cookie";
export const cookies = new Cookies();

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
  headers: { Authorization: `Bearer ${cookies.get("accessToken")}` },
});

instance.interceptors.request.use(
  function (res) {
    return res;
  },
  function (e) {
    return Promise.reject(e);
  }
);

instance.interceptors.response.use(
  function (res) {
    return res;
  },
  function (e) {
    if (e.response.data.statusCode === 401) {
      getRefreshToken();
      return;
    }
    return Promise.reject(e);
  }
);

export const getRefreshToken = async (params) => {
  try {
    console.log(`${cookies.get("refreshToken")}`);
    const res = await axios.get(
      `https://dev-apis.kracker.kr/vendor/auth/getAccessToken`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("accessToken")}`,
        },
        body: JSON.stringify({
          refreshToken: `${cookies.get("refreshToken")}`,
        }),
      }
    );
    console.log(res);
    return res.data;
  } catch (e) {
    cookies.remove("refreshToken");
    cookies.remove("accessToken");
    window.location.href = "/login";
    console.log(e);
  }
};
