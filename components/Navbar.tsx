import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  List,
  ListItem,
  Switch,
  Text,
  useColorMode
} from "@chakra-ui/react";

import Link from "next/link";

import { useUserStore } from "../store/useStore";

import NavItem from "./NavItem";
import NavProfileMenu from "./NavProfileMenu";
import NewSheetDrawer from "./NewSheetDrawer";

const Navbar = () => {
  const { authenticated } = useUserStore((state) => ({
    authenticated: state.authenticated
  }));
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box
        as="nav"
        w="100%"
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
          bgColor="blue"
          m="auto"
          w={["100%", "94%", "90%"]}
          top="0"
          color="gray"
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
            alignItems="center"
            justifyContent="space-evenly"
            fontWeight="semibold"
            py="2"
          >
            {authenticated ? (
              <>
                <NavItem link="/home" name="Home" />
                <ListItem mt="0 !important">
                  <NewSheetDrawer />
                </ListItem>
                <ListItem mt="0 !important">
                  <NavProfileMenu />
                </ListItem>
              </>
            ) : (
              <NavItem link="/login" name="Login" />
            )}
            <ListItem mt="0 !important">
              <IconButton
                variant="ghost"
                fontSize="18px"
                aria-label="color-mode"
                onClick={toggleColorMode}
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              />
            </ListItem>
          </List>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
