import "../styles/globals.css";

// import App from "next/app";
import type { AppProps /*, AppContext */ } from "next/app";
import { ChakraProvider, Flex, theme } from "@chakra-ui/react";
import { AuthProvider } from "../context/userContext/UserState";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { NotesheetProvider } from "../context/notesheetContext/NotesheetState";
import { SWRConfig } from "swr";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useUserStore } from "../store/useStore";
import Footer from "../components/Footer";

axios.defaults.baseURL = process.env.API_URL;
axios.defaults.withCredentials = true;

const fetcher = async (url) => {
  try {
    const res = await axios.get(url);

    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  const { push, pathname } = useRouter();
  const authRoutes = ["/login"];

  const authRoute = authRoutes.includes(pathname);

  const authenticated = useUserStore((state) => state.authenticated);
  useEffect(() => {
    const nonAuthRoutes = ["/"];
    const escapeRoute = nonAuthRoutes.includes(pathname);
    if (!authenticated && !escapeRoute) {
      push("/login");
    }
  }, []);

  return (
    <SWRConfig value={{ fetcher }}>
      {/* <AuthProvider> */}
      {/* <NotesheetProvider> */}
      <ChakraProvider theme={theme} resetCSS>
        <div style={{ flex: "1" }}>
          {!authRoute && <Navbar />}
          <Component {...pageProps} />
        </div>
        <Footer />
      </ChakraProvider>
      {/* </NotesheetProvider> */}
      {/* </AuthProvider> */}
    </SWRConfig>
  );
}

export default MyApp;
