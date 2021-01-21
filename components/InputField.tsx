import {
  FormControl,
  FormErrorMessage,
  Input,
  Textarea
} from "@chakra-ui/react";

interface IInputProps {
  type: string;
  fName: string;
  error?: string | undefined | null;
  register: any;
}

const InputField: React.FC<IInputProps> = ({
  type,
  fName,
  error,
  register
}) => {
  return (
    <div>
      <FormControl isInvalid={!!error} isRequired p="3">
        {type !== "tArea" ? (
          <Input
            type={type}
            name={fName}
            placeholder={fName}
            ref={register}
            id={fName}
            _placeholder={{ textTransform: "capitalize" }}
          />
        ) : (
          <Textarea placeholder="body" ref={register} name={fName} id={fName} />
        )}
        <FormErrorMessage>{error}</FormErrorMessage>
      </FormControl>
    </div>
  );
};

export default InputField;
