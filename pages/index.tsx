import { CheckCircleIcon } from "@chakra-ui/icons";
import { Button, Flex, List, ListIcon, ListItem } from "@chakra-ui/react";

import Link from "next/link";

const CustomItem = ({ children }: { children: string }) => (
  <ListItem>
    <ListIcon as={CheckCircleIcon} color="green.500" />
    {children}
  </ListItem>
);

export default function Home() {
  return (
    <Flex align="center" justify="center" h="100%">
      <List spacing={4}>
        <CustomItem>Create Notesheets in a zap.</CustomItem>
        <CustomItem>
          Notesheets get transferred uppward in hierarchy.
        </CustomItem>
        <CustomItem>Instant acceptance and completion of notesheet.</CustomItem>
      </List>
    </Flex>
  );
}
