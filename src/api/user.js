import { instance } from "@utils/axios";
import { Cookies } from "react-cookie";
export const cookies = new Cookies();

export const SignupUser = async (params) => {
  try {
    const res = await instance.post(`/auth/signup`, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const EmailCheck = async (params) => {
  try {
    const res = await instance.get(`/auth/chkDupl`, { params: params });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const userInfo = async () => {
  try {
    const res = await instance.get(`/listing/stat`);

    return res.data;
  } catch (e) {
    console.log(e);
    return;
  }
};

export const LoginUser = async (params) => {
  try {
    const res = await instance.post(`/auth/signin`, params);
    console.log(res);
    const today = new Date();
    const expireDate = today.setDate(today.getDate() + 1);
    if (res.data.statusCode === 200) {
      cookies.set("accessToken", res.data.data.accessToken, {
        secure: false,
        expires: new Date(expireDate),
        // sameSite: "none",
        path: "/",
      });
      cookies.set("refreshToken", res.data.data.refreshToken, {
        secure: false,
        // sameSite: "none",
        expires: new Date(expireDate),
        path: "/",
      });
      window.localStorage.setItem("bizFile", res.data.data.bizFile);
    }
    return res.data;
  } catch (e) {
    console.log(44444, e);
  }
};
