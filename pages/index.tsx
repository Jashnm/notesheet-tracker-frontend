import { Box, Button, Flex } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Flex align="center" justify="center">
        <Button as={Link} href="/login" colorScheme="cyan">
          <a>Login</a>
        </Button>
      </Flex>
    </div>
  );
}
