import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSheetStore } from "../store/useStore";
import NotesheetForm from "./Notesheet/NotesheetForm";

const NewSheetDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const loading = useSheetStore((state) => state.loading);

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Create Notesheet
      </Button>

      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>New Notesheet</DrawerHeader>
          <DrawerBody>
            <NotesheetForm />
          </DrawerBody>
          <DrawerFooter>
            <Button
              type="submit"
              p="3"
              mt="10"
              mb="4"
              colorScheme="blue"
              mx="3"
              rounded="sm"
              w="60%"
              fontSize="lg"
              form="sheet-form"
              isLoading={loading}
            >
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NewSheetDrawer;
