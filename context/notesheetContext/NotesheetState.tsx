import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useContext, useReducer } from "react";
import {
  GET_LIVE_NOTESHEETS,
  CREATE_NOTESHEET,
  NOTESHEETS_ERROR
} from "../../constants";
import {
  NoteState,
  NotesheetContext,
  NotesheetDispatch
} from "./notesheetContext";

import { notesheetReducer } from "./notesheetReducer";

export const NotesheetProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [state, noteDispatch] = useReducer(notesheetReducer, {
    notesheets: null,
    error: null,
    loading: true
  });

  const dispatch = (type: string, payload?: any) => {
    noteDispatch({ type, payload });
  };

  return (
    <NotesheetContext.Provider value={state}>
      <NotesheetDispatch.Provider value={dispatch}>
        {children}
      </NotesheetDispatch.Provider>
    </NotesheetContext.Provider>
  );
};

export const useNoteState = () => useContext(NotesheetContext);
export const useNoteDispatch = () => useContext(NotesheetDispatch);
