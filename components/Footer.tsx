import { Box, Divider, Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <>
      <Flex
        w="100%"
        h="4em"
        mt="2rem"
        id="footer"
        bgColor="blue"
        borderTop="1px"
        borderTopColor="gray.300"
      >
        <Flex
          w="100%"
          maxW={["100vw", "90vw"]}
          mx="auto"
          align="center"
          color="gray.400"
          justify="space-between"
          px="4"
        >
          <Text>Note-sheet Tracker for MUJ</Text>
          <Text fontSize="sm">
            Developed by{" "}
            <Text as="a" href="https://jashn.xyz" color="blue.600">
              {" "}
              Jashn Maloo{" "}
            </Text>
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default Footer;
