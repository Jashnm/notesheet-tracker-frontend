import { State } from "zustand";
import { SET_ALERT } from "../constants";

interface Action {
  type: string;
  payload: any;
}

export const miscReducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        alert: payload.alert,
        message: payload.message
      };

    default:
      return {
        ...state
      };
  }
};
