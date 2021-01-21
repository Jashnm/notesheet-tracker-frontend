import axios from "axios";
// import { API } from "../constants";

export const login = async (email: string, password: string) => {
  try {
    const res = await axios.post(`/user/login`, {
      email,
      pwd: password
    });
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getProfile = async () => {
  try {
    let res = await axios.get(`/user/profile`);

    return res.data;
  } catch (err) {
    console.log(err.response);

    throw err.response.data;
  }
};

export const logout = async () => {
  try {
    await axios.get(`/user/logout`);
  } catch (err) {}
};
