import { Button, Flex } from "@chakra-ui/react";

import Link from "next/link";

export default function Home() {
  return (
    <Flex align="center" justify="center">
      <Button as={Link} href="/login" colorScheme="cyan">
        <a>Login</a>
      </Button>
    </Flex>
  );
}
