import "../styles/globals.css";

import type { AppProps /*, AppContext */ } from "next/app";
import { ChakraProvider, Flex, theme } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { SWRConfig } from "swr";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useUserStore } from "../store/useStore";
import Footer from "../components/Footer";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
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
      <ChakraProvider theme={theme} resetCSS>
        <div style={{ flex: "1" }}>
          {!authRoute && <Navbar />}
          <Component {...pageProps} />
        </div>
        <Footer />
      </ChakraProvider>
    </SWRConfig>
  );
}

export default MyApp;
