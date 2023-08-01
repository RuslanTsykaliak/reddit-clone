import { Flex, Input, Stack, Textarea, Button } from "@chakra-ui/react";
import React from "react";

type TextInputsProps = {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

const TextInputs: React.FC<TextInputsProps> = ({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}) => {
  console.log(textInputs.title);
  return (
    <Stack spacing={3} width="100%">
      {/* Input for post title */}
      <Input
        name="title"
        value={textInputs.title}
        onChange={onChange}
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black",
        }}
        fontSize="10pt"
        borderRadius={4}
        placeholder="Title"
      />
      {/* Textarea for post body */}
      <Textarea
        name="body"
        value={textInputs.body}
        onChange={onChange}
        fontSize="10pt"
        // borderRadius={4}
        height="100px"
        placeholder="Text (optional)"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black",
        }}
      />

      {/* Button to post the content */}
      <Flex justify="flex-end">
        <Button
          height="34px"
          padding="0px 30px"
          disabled={!textInputs.title} // Dosen't work // Disable button if the title is empty
          isLoading={loading} // Show loading state when posting
          onClick={handleCreatePost} // Trigger the handleCreatePost function when clicked
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
export default TextInputs;
