import {
  Box,
  Button,
  Flex,
  Image,
  List,
  ListItem,
  Text
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { mutate } from "swr";
import { logout } from "../API/userActions";
import { LOGOUT, START_LOADING } from "../constants";
import {
  useAuthDispatch,
  useAuthState
} from "../context/userContext/UserState";
import { useUserStore } from "../store/useStore";
import useUser from "../utils/useUser";
import NavItem from "./NavItem";
import NavProfileMenu from "./NavProfileMenu";
import NewSheetDrawer from "./NewSheetDrawer";

const Navbar = () => {
  //   const { authenticated, mutate, loading } = useUser();

  const { authenticated, loading, dispatch } = useUserStore((state) => ({
    authenticated: state.authenticated,
    loading: state.loading,
    dispatch: state.dispatch
  }));
  const router = useRouter();

  if (loading) return null;

  return (
    <>
      <Box w="100%" borderBottom="1px" borderBottomColor="gray.100" maxH="6rem">
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          px={["1rem", "1.5rem"]}
          py={["0.2rem", "0.5rem"]}
          background="white"
          m="auto"
          w={["100%", "94%", "90%"]}
          top="0"
          color="cyan.900"
        >
          <Link href="/">
            <a>
              <Text fontSize="3xl" letterSpacing="0.06em" fontWeight="semibold">
                Notesheet Tracker
              </Text>{" "}
            </a>
          </Link>

          <List
            maxW="420px"
            w="100%"
            spacing={5}
            listStyleType="none"
            display="flex"
            flexWrap="wrap"
            justifyContent="space-evenly"
            alignItems="baseline"
            fontWeight="semibold"
          >
            {authenticated ? (
              <>
                <NavItem link="/main" name="Home" />
                <ListItem>
                  <NewSheetDrawer />
                </ListItem>
                <ListItem>
                  <NavProfileMenu />
                </ListItem>
                {/*
                <ListItem>
                  <Button
                    colorScheme="cyan"
                    variant="outline"
                    alignItems="center"
                    onClick={() => {
                      logout();
                      dispatch(LOGOUT);
                      dispatch(START_LOADING);
                      // mutate();
                      router.push("/login");
                    }}
                  >
                    Logout
                  </Button>
                </ListItem> */}
              </>
            ) : (
              <NavItem link="/login" name="Login" />
            )}
          </List>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
