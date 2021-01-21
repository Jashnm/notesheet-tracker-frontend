import {
  Badge,
  Box,
  Button,
  Flex,
  Tag,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import { transform } from "framer-motion";
import { useState } from "react";
import { mutate } from "swr";
import nsActions from "../../API/notesheetActions";
import { Notesheet } from "../../types";
import SheetModal from "./SheetModal";
import WrapNoteItem from "./WrapNoteItem";

interface INotesheetProps {
  notesheet: Notesheet | undefined;
  creator: boolean;
}

const NotesheetBox: React.FC<INotesheetProps> = ({ notesheet, creator }) => {
  const delNotesheet = async (uuid: string) => {
    await nsActions.deleteNotesheet(uuid);
    mutate("/notesheet/allsheets");
  };

  const bg = useColorModeValue("blue.400", "blue.600");
  const color = useColorModeValue("gray.100", "gray.700");
  const {
    title,
    body,
    startedBy,
    financial,
    status,
    uuid,
    createdAt,
    updatedAt
  } = notesheet;

  const [open, setOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        boxShadow="lg"
        rounded="md"
        transition="0.2s ease-in-out"
        _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
        mx="3"
        my="5"
      >
        <Wrap bgColor={bg} px="2" py="4" rounded="sm">
          <WrapItem>
            <Text fontSize="lg" fontWeight="bold">
              {title}
            </Text>
          </WrapItem>
          <WrapItem bgColor={color} rounded="sm">
            <Text px="2" fontSize="md">
              By{" "}
              <Text as="span" fontWeight="semibold">
                {startedBy.name}
              </Text>
            </Text>
          </WrapItem>

          <Tag
            borderRadius="full"
            ml="auto"
            mr="4"
            variant="solid"
            colorScheme={status === "LIVE" ? "green" : "orange"}
          >
            {status}
          </Tag>
        </Wrap>

        <Wrap mt="1" p="2">
          <WrapNoteItem name="Created At:">
            {new Date(createdAt).toLocaleString("en-IN")}
          </WrapNoteItem>
          <WrapNoteItem name=" Updated At:">
            {new Date(updatedAt).toLocaleString("en-IN")}
          </WrapNoteItem>
          <WrapNoteItem name="Financial:">
            {financial ? "Yes" : "No"}
          </WrapNoteItem>
        </Wrap>
        <Flex mt="3" lineHeight="md" px="2">
          <Box p="1" fontWeight="semibold">
            Description:
            <Text fontWeight="normal" color="gray" mt="1">
              {body}
            </Text>
          </Box>
        </Flex>
        <Box textAlign="end">
          <Button
            m="2"
            p="2"
            rounded="sm"
            variant="ghost"
            colorScheme="blue"
            onClick={() => {
              onOpen();
              setOpen(!open);
            }}
          >
            Details
          </Button>{" "}
          {creator && (
            <Button
              m="2"
              p="2"
              rounded="sm"
              variant="ghost"
              colorScheme="red"
              onClick={() => delNotesheet(uuid)}
            >
              Delete
            </Button>
          )}
        </Box>
      </Box>
      {open && (
        <SheetModal isOpen={isOpen} onClose={onClose} notesheet={notesheet} />
      )}
    </>
  );
};

export default NotesheetBox;
