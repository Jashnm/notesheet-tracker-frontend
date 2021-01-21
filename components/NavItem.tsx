import { Text } from "@chakra-ui/react";
import Link from "next/link";

interface INavItemsProps {
  name: string;
  link: string;
}

const NavItem: React.FC<INavItemsProps> = ({ name, link }) => {
  return (
    <>
      <Link href={link}>
        <a>
          <Text fontSize="lg" colorScheme="blue" _hover={{ color: "blue.700" }}>
            {name}
          </Text>
        </a>
      </Link>
    </>
  );
};

export default NavItem;
