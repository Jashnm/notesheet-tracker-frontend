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

  const { authenticated } = useUserStore((state) => ({
    authenticated: state.authenticated
  }));

  return (
    <>
      <Box
        as="nav"
        w="100vw"
        borderBottom="1px"
        borderBottomColor="gray.100"
        minH="6rem"
      >
        <Flex
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
                <NavItem link="/home" name="Home" />
                <ListItem>
                  <NewSheetDrawer />
                </ListItem>
                <ListItem>
                  <NavProfileMenu />
                </ListItem>
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
