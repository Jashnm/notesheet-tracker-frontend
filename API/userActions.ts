import axios from "axios";
import { API } from "../constants";

export const login = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${API}/user/login`, {
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
    let res = await axios.get(`${API}/user/profile`);
    console.log(res.data);

    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const logout = async () => {
  try {
    await axios.get(`${API}/user/logout`);
  } catch (err) {}
};
