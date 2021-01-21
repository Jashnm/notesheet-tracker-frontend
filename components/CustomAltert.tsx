import { Alert, AlertIcon, AlertTitle, CloseButton } from "@chakra-ui/react";
import { useAltertStore } from "../store/useStore";

const CustomAltert = () => {
  const { type, message } = useAltertStore((state) => ({
    type: state.type,
    message: state.message
  }));
  return (
    <>
      <Alert status={type}>
        <AlertIcon />
        <AlertTitle mr={2}>{message}</AlertTitle>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    </>
  );
};

export default CustomAltert;
