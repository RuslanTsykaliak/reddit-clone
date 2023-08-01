import { Input } from "@chakra-ui/react";
import React from "react";

type InputItemProps = {
    name: string; // Name attribute for the input element
    value?: string; // Current value of the input element
    placeholder?: string; // Placeholder text for the input element
    type: string; // Type attribute for the input element (e.g., "text", "password", etc.)
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle onChange event
    mb?: number; // Optional margin bottom value for the input element
    bg?: string; // Optional background color for the input element
    size?: string; // Size attribute for the input element
};

const InputItem: React.FC<InputItemProps> = ({
  name,
  placeholder,
  value,
  type,
  onChange,
  mb,
  bg,
  size,
}) => {
  return (
    <Input
      name={name}
      placeholder={placeholder}
      value={value}
      required // Input is required
      onChange={onChange}
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
      bg={bg || "gray.50"} // Use specified background color or default to gray.50
      size={size} // Set the size of the input element
      type={type}
      borderRadius={4} // Add a border radius to the input element
    />
  );
};

export default InputItem;
