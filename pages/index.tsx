import { Button, Flex } from "@chakra-ui/react";

import Link from "next/link";

export default function Home() {
  return (
    <Flex align="center" justify="center" h="100%">
      <Button colorScheme="cyan" color="white" fontSize="1.5rem" py="4" px="6">
        <Link href="/login">
          <a>Login</a>
        </Link>
      </Button>
    </Flex>
  );
}
