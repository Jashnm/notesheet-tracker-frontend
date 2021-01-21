import { User } from "../../types";
import * as React from "react";

interface State {
  user: User | undefined;
  authenticated: boolean;
  loading: boolean;
}

export const UserContext = React.createContext<State | undefined>(undefined);

export const DispatchContext = React.createContext(null);
