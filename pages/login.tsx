import axios from "axios";
import Joi from "joi";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { joiResolver } from "@hookform/resolvers/joi";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import InputField from "../components/InputField";
import { getProfile } from "../API/userActions";

import { LOGIN } from "../constants";
import { useUserStore } from "../store/useStore";

const schema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
});

const login = () => {
  // const { authenticated } = useAuthState();
  // const dispatch = useAuthDispatch();
  const { authenticated, dispatch, loading } = useUserStore((state) => ({
    authenticated: state.authenticated,
    loading: state.loading,

    dispatch: state.dispatch
  }));

  // const { mutate, authenticated } = useUser();

  const router = useRouter();
  if (authenticated) router.push("/main");

  const { register, handleSubmit, errors, setError } = useForm({
    mode: "onBlur",
    resolver: joiResolver(schema)
  });

  // const onSubmit = async (values) => {
  //   const { email, password } = values;

  //   const res = await loginUser(email, password);
  //   mutate();
  //   console.log(res);

  //   if (res) {
  //     router.push("/main");
  //   }
  // };

  const onSubmit = async (values) => {
    const { email, password } = values;
    try {
      const res = await axios.post("/user/login", {
        email,
        pwd: password
      });
      if (res.data) {
        const profile = await getProfile();
        dispatch(LOGIN, profile);

        router.replace("/main");
      }
    } catch (err) {
      setError("password", {
        type: "server",
        message: err.response.data.message
      });
    }
  };

  return (
    <div>
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
              Log In
            </Text>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                type="email"
                error={errors?.email?.message}
                fName="email"
                register={register}
              />
              <InputField
                type="password"
                error={errors?.password?.message}
                fName="password"
                register={register}
              />
              <Button
                type="submit"
                p="3"
                mt="4"
                colorScheme="cyan"
                mx="3"
                w="60%"
                fontSize="lg"
              >
                Log In
              </Button>
            </form>
            <Box fontSize="sm" mt="2" mx="4" fontWeight="semibold">
              New here?{" "}
              <Link href="/register">
                <Text as="a" color="cyan.600" cursor="pointer">
                  Sign Up
                </Text>
              </Link>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </div>
  );
};

export default login;
