import { instance } from "@utils/axios";

export const Listing = async (params) => {
  try {
    const res = await instance.get(`/listing`, { params: params });

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getStock = async (id) => {
  try {
    const res = await instance.get(`/listing/stock/${id}`);

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getCorp = async (id) => {
  try {
    const res = await instance.get(`/listing/corp/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const editStock = async (id, list, price) => {
  try {
    const params = {
      colors: list,
      price: Number(price),
    };
    const res = await instance.put(`/listing/stock/${id}`, params);
  } catch (e) {
    console.log(e);
  }
};
