import { FormControl, Input } from "@chakra-ui/react";
import React from "react";

type InputFieldProps = {
  name: string; // Name attribute for the input field
  placeholder: string; // Placeholder text for the input field
  type: string; // Type attribute for the input field (e.g., "text", "password", etc.)
  isRequired?: boolean; // Optional boolean flag to indicate if the input is required
  mb?: number; // Optional margin bottom value for the input field
};

const InputField: React.FC<InputFieldProps> = ({
  name,
  placeholder,
  type,
  isRequired, // Not sure if will need this
  mb,
}) => {
  return (
    <>
      <Input
        bg="gray.50"
        name={name}
        placeholder={placeholder}
        type={type}
        mb={mb}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
      />
    </>
  );
};
export default InputField;
