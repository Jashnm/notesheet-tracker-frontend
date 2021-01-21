import { Notesheet } from "../../types";
import { createContext } from "react";

export interface NoteState {
  notesheets: [Notesheet] | undefined;
  loading: boolean;
  error: string | any | undefined;
}

export const NotesheetContext = createContext<NoteState | undefined>(undefined);
export const NotesheetDispatch = createContext(null);
