import { instance } from "@utils/axios";

export const Listing = async (params) => {
  try {
    console.log(params);
    const res = await instance.get(`/listing`, { params: params });
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

export const getStock = async (id) => {
  try {
    console.log(id);
    const res = await instance.get(`/listing/stock/${id}`);
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
