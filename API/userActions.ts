import axios from "axios";

export const login = async (email: string, password: string) => {
  try {
    const res = await axios.post("/user/login", {
      email,
      pwd: password
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

export const getProfile = async () => {
  try {
    let res = await axios.get(`/user/profile`);
    console.log(res.data);

    return res.data;
  } catch (err) {
    console.log(err);
    throw err.response.data;
  }
};

export const logout = async () => {
  try {
    await axios.get(`/user/logout`);
  } catch (err) {
    console.log(err);
  }
};
