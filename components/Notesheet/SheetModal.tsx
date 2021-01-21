import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
  Wrap,
  Flex,
  useToast
} from "@chakra-ui/react";
import useSWR, { mutate } from "swr";
import nsActions from "../../API/notesheetActions";
import { useUserStore } from "../../store/useStore";
import WrapNoteItem from "./WrapNoteItem";

interface ISheetModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
  notesheet: any;
}

const SheetModal: React.FC<ISheetModalProps> = ({
  isOpen,
  onClose,
  notesheet
}) => {
  const user = useUserStore((state) => state.user);
  const toast = useToast();
  const { title, body, startedBy, financial, status, uuid } = notesheet;

  const newToast = (status: "success" | "error", title: string) => {
    return toast({
      status,
      title,
      isClosable: true,
      duration: 4000
    });
  };
  const markComplete = async () => {
    const status = "COMPLETED";
    await nsActions.updateNotesheet(uuid, { status });
    mutate("/user/notesheets");
    newToast("success", "Notesheet has completed its course.");
  };
  const proceedNext = async () => {
    let status = "LIVE";
    if (user.role === "DEAN") {
      status = "COMPLETED";
    }
    await nsActions.updateNotesheet(uuid, { status });
    mutate("/user/notesheets");
    newToast("success", "Accepted and updated.");
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      {notesheet && (
        <ModalContent>
          <ModalHeader>
            {title} by{" "}
            <Text as="span" fontSize="md">
              {startedBy.name}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Wrap mb="2">
              <WrapNoteItem name="Financial: ">
                {" "}
                {financial ? "Yes" : "No"}
              </WrapNoteItem>
            </Wrap>
            <Box>{body}</Box>
            <Box as="form"></Box>

            <Box></Box>
          </ModalBody>

          <ModalFooter>
            <Flex w="100%" justify="space-between">
              {status === "LIVE" && (
                <Button
                  colorScheme="orange"
                  variant="outline"
                  onClick={markComplete}
                >
                  Mark Complete
                </Button>
              )}
              {user && user.uuid !== startedBy.uuid && (
                <Button
                  colorScheme="cyan"
                  variant="outline"
                  mr={3}
                  onClick={proceedNext}
                >
                  Accept & Proceed
                </Button>
              )}
            </Flex>
            <Button colorScheme="cyan" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
};

export default SheetModal;
