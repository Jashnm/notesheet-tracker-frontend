import axios from "axios";
import { API } from "../constants";

const nsActions = {
  createNotesheet: async (values) => {
    try {
      const { title, body, financial } = values;

      const res = await axios.post(`${API}/notesheet/new`, {
        title: title,
        body,
        financial: financial
      });
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  },

  getLiveNotesheets: async () => {
    try {
      const res = await axios.get(`${API}/user/live-notesheets`);
      return res.data;
    } catch (err) {
      console.log(err.response);
      return err.response.data;
    }
  },

  updateNotesheet: async (uuid: string, data) => {
    try {
      const res = await axios.put(`${API}/notesheet/${uuid}`, data);
      return res.data;
    } catch (err) {
      console.log(err.response);
      return err.response.data;
    }
  },

  deleteNotesheet: async (uuid: string) => {
    try {
      const res = await axios.delete(`${API}/notesheet/delete/${uuid}`);
      return res.data;
    } catch (err) {
      console.log(err.response.data);

      return err.response.data;
    }
  }
};

export default nsActions;
