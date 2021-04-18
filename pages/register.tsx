import axios from "axios";
import Joi from "joi";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { joiResolver } from "@hookform/resolvers/joi";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import InputField from "../components/InputField";
import { getProfile } from "../API/userActions";

import { LOGIN, START_LOADING } from "../constants";
import { useUserStore } from "../store/useStore";

const schema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
});

const login = () => {
  const { authenticated, dispatch, loading } = useUserStore((state) => ({
    authenticated: state.authenticated,
    loading: state.loading,

    dispatch: state.dispatch
  }));

  const router = useRouter();
  if (authenticated) router.push("/home");

  const { register, handleSubmit, errors, setError } = useForm({
    mode: "onBlur",
    resolver: joiResolver(schema)
  });

  const onSubmit = async (values) => {
    const { email, password } = values;
    dispatch(START_LOADING);
    try {
      const res = await axios.post("/user/login", {
        email,
        pwd: password
      });

      console.log(res);
      if (res.data) {
        dispatch(LOGIN, res.data);

        router.replace("/home");
      }
    } catch (err) {
      setError("password", {
        type: "server",
        message: err.response.data.message
      });
    }
  };

  return (
    <>
      <Flex w="100vw" direction={["column", "column", "row"]}>
        <Flex
          w={["100%", "100%", "60%"]}
          h="100vh"
          ml={["0", "0", "6"]}
          justify={["center", "center", "left"]}
          align="center"
        >
          <Box w="80%" maxW="420px">
            <Text
              fontSize="xl"
              textTransform="uppercase"
              fontWeight="semibold"
              mx="3"
            >
              Sign up not possible publicly
            </Text>

            <Box fontSize="sm" mt="2" mx="4" fontWeight="semibold">
              Already a user?{" "}
              <Link href="/login">
                <Text as="a" color="blue.600" cursor="pointer">
                  Log In
                </Text>
              </Link>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default login;
