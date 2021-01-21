import { Text, WrapItem } from "@chakra-ui/react";

const WrapNoteItem = ({ name, children }: { name: string; children: any }) => {
  return (
    <WrapItem bgColor="gray">
      <Text p="1" fontWeight="semibold">
        {name}{" "}
        <Text as="span" color="blue" fontWeight="normal">
          {children}
        </Text>
      </Text>
    </WrapItem>
  );
};

export default WrapNoteItem;
