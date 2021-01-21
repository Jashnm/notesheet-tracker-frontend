import { LOGIN, LOGOUT, START_LOADING, STOP_LOADING } from "../constants";
import { State } from "../types";

interface Action {
  type: string;
  payload: any;
}

export const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case LOGIN:
      return {
        ...state,
        authenticated: true,
        user: payload,
        loading: false
      };
    case LOGOUT:
      return {
        ...state,
        authenticated: false,
        user: null,
        loading: false
      };
    case START_LOADING:
      return {
        ...state,
        loading: true
      };
    case STOP_LOADING:
      return {
        ...state,
        loading: false
      };

    default:
      return {
        ...state
      };
  }
};
