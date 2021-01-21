import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { logout } from "../API/userActions";
import { LOGOUT, START_LOADING } from "../constants";
import { useUserStore } from "../store/useStore";
import NavItem from "./NavItem";

const NavProfileMenu = () => {
  const dispatch = useUserStore((state) => state.dispatch);
  const router = useRouter();
  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Account
        </MenuButton>
        <MenuList>
          <MenuItem>
            {" "}
            <NavItem link="/profile" name="Profile" />
          </MenuItem>

          <MenuDivider />
          <MenuItem
            onClick={() => {
              logout();
              dispatch(LOGOUT);
              sessionStorage.clear();

              router.push("/login");
            }}
          >
            Logout{" "}
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default NavProfileMenu;
