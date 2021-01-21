import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useReducer } from "react";
import { LOGIN } from "../../constants";
import { DispatchContext, UserContext } from "./userContext";
import { reducer } from "./userReducer";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, defaultDispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
    loading: true
  });

  const dispatch = (type: string, payload?: any) => {
    defaultDispatch({ type, payload });
  };

  const router = useRouter();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/user/profile");

        dispatch(LOGIN, res.data);
      } catch (err) {
        console.log(err.response.data);
        const { pathname } = router;
        const nonAuthRoutes = ["/"];
        const escapeRoute = nonAuthRoutes.includes(pathname);
        if (err.response.status === 401 && !escapeRoute) {
          router.push("/login");
        }
      }
    };
    getUser();
  }, []);
  return (
    <DispatchContext.Provider value={dispatch}>
      <UserContext.Provider value={state}>{children}</UserContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAuthState = () => useContext(UserContext);
export const useAuthDispatch = () => useContext(DispatchContext);
// export const useNoteState = () => useContext(NotesheetContext);
