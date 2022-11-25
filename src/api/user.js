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

export const LoginUser = async (params) => {
  try {
    const res = await instance.post(`/auth/signin`, params);
    console.log(res);
    const today = new Date();
    const expireDate = today.setDate(today.getDate() + 7);

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
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
