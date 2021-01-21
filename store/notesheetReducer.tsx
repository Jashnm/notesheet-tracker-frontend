import {
  GET_LIVE_NOTESHEETS,
  NOTESHEETS_ERROR,
  REMOVE_NOTESHEETS,
  START_LOADING,
  STOP_LOADING,
  UPDATE_NOTESHEET,
  USER_NOTESHEETS
} from "../constants";

interface Action {
  type: string;
  payload: any;
}

export const notesheetReducer = (state, { type, payload }: Action) => {
  switch (type) {
    case GET_LIVE_NOTESHEETS:
      return {
        ...state,
        notesheets: payload,
        loading: false
      };
    case USER_NOTESHEETS:
      return {
        ...state,
        userNotesheets: payload,
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
    case REMOVE_NOTESHEETS:
      return {
        ...state,
        notesheets: null,
        loading: false
      };
    case UPDATE_NOTESHEET:
      return {
        ...state,
        notesheets: state.notesheets.map((n) =>
          n.uuid === payload.uuid ? payload : n
        ),
        loading: false
      };
    case NOTESHEETS_ERROR:
      return {
        ...state,
        error: null,
        loading: false
      };
    default:
      return {
        ...state
      };
  }
};
