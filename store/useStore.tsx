import create from "zustand";
import { persist } from "zustand/middleware";
import { notesheetReducer } from "./notesheetReducer";
import { reducer } from "./userReducer";
import { User, Notesheet } from "../types";

type UserState = {
  user: User | undefined;
  authenticated: boolean;
  loading: boolean;
  dispatch: (type: string, payload?: any) => any;
};

type SheetState = {
  notesheets: Notesheet[] | undefined;
  userNotesheets: Notesheet[] | undefined;
  loading: boolean;
  dispatch: (type: string, payload?: any) => any;
};

export const useUserStore = create<UserState>(
  persist(
    (set) => ({
      user: null,
      authenticated: false,
      loading: false,
      userNotesheets: null,
      dispatch: (type, payload) =>
        set((state) => reducer(state, { type, payload }))
    }),
    { name: "user", getStorage: () => sessionStorage }
  )
);

export const useSheetStore = create<SheetState>(
  persist(
    (set) => ({
      notesheets: null,
      loading: false,
      userNotesheets: null,
      dispatch: (type, payload) =>
        set((state) => notesheetReducer(state, { type, payload }))
    }),
    { name: "notesheets", getStorage: () => sessionStorage }
  )
);
