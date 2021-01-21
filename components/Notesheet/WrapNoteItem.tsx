import { Text, WrapItem } from "@chakra-ui/react";

const WrapNoteItem = ({ name, children }: { name: string; children: any }) => {
  return (
    <WrapItem bgColor="gray.100">
      <Text p="1" fontWeight="semibold">
        {name}{" "}
        <Text as="span" color="gray.600" fontWeight="normal">
          {children}
        </Text>
      </Text>
    </WrapItem>
  );
};

export default WrapNoteItem;
