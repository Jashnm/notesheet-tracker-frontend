import create from "zustand";
import { persist } from "zustand/middleware";
import { notesheetReducer } from "../context/notesheetContext/notesheetReducer";
import { reducer } from "../context/userContext/userReducer";
import { miscReducer } from "../context/miscReducer";
import { User, Notesheet } from "../types";

type UserState = {
  user: User | undefined;
  authenticated: boolean;
  loading: boolean;
  dispatch: (type: string, payload?) => any;
};

type SheetState = {
  notesheets: Notesheet[] | undefined;
  userNotesheets: Notesheet[] | undefined;
  loading: boolean;
  startLoading: () => void;
  //   getNotesheets: (data) => any;
  dispatch: (type, payload) => any;
};

type AlterState = {
  type: "info" | "warning" | "success" | "error";
  message: string;
  dispatch: (type, payload) => any;
};

export const useUserStore = create<UserState>(
  persist(
    (set) => ({
      user: null,
      authenticated: false,
      loading: true,
      userNotesheets: null,
      dispatch: (type, payload) =>
        set((state) => reducer(state, { type, payload }))
    }),
    { name: "user", getStorage: () => sessionStorage }
  )
);

// const useStore = create(devtools(useUserStore));

export const useSheetStore = create<SheetState>((set) => ({
  notesheets: null,
  loading: true,
  userNotesheets: null,
  startLoading: () => set((state) => ({ loading: true })),

  dispatch: (type, payload?) =>
    set((state) => notesheetReducer(state, { type, payload }))
}));

export const useAltertStore = create<AlterState>((set) => ({
  type: "info",
  message: "Message",
  dispatch: (type, payload) =>
    set((state) => miscReducer(state, { type, payload }))
}));
