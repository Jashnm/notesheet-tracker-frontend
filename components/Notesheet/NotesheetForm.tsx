import { Box, Button, Checkbox, useToast } from "@chakra-ui/react";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import nsActions from "../../API/notesheetActions";
import { START_LOADING, STOP_LOADING } from "../../constants";
import { useSheetStore } from "../../store/useStore";
import InputField from "../InputField";

const schema = Joi.object({
  title: Joi.string().min(6).required(),
  body: Joi.string().min(11).required(),
  financial: Joi.boolean()
});

const NotesheetForm = () => {
  const toast = useToast();

  const { register, handleSubmit, errors, setError, reset } = useForm({
    mode: "onBlur",
    resolver: joiResolver(schema)
  });
  const dispatch = useSheetStore((state) => state.dispatch);

  const onSubmit = async (values) => {
    dispatch(START_LOADING);
    await nsActions.createNotesheet(values);
    mutate("/user/notesheets");
    reset();
    toast({
      status: "success",
      title: "Successfully created",
      isClosable: true,
      duration: 4000
    });
  };
  return (
    // <Box
    //   m="3"
    //   border="1px"
    //   borderColor="gray.400"
    //   rounded="sm"
    //   height="fit-content"
    // >
    <form onSubmit={handleSubmit(onSubmit)} id="sheet-form">
      <InputField
        type="text"
        error={errors?.title?.message}
        fName="title"
        register={register}
      />

      <InputField
        type="tArea"
        fName="body"
        error={errors?.body?.message}
        register={register}
      />
      <Checkbox
        mx="3"
        size="md"
        colorScheme="blue"
        ref={register}
        name="financial"
      >
        Financial
      </Checkbox>
    </form>
    // </Box>
  );
};

export default NotesheetForm;
