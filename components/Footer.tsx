import { Box, Divider, Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <>
      <Flex w="100%" h="4em" id="footer" bg="gray.100">
        <Flex
          w="100%"
          maxW={["100vw", "90vw"]}
          mx="auto"
          align="center"
          color="gray.400"
          justify="space-between"
          px="4"
          fontSize="lg"
        >
          <Text>Note-sheet Tracker for MUJ</Text>
          <Text fontSize="sm">
            Developed by{" "}
            <Text as="a" href="https://jashn.xyz" color="cyan.600">
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
