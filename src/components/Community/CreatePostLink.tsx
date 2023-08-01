import { authModalState } from "@/src/atoms/authModalAtom";
import { auth } from "@/src/firebase/clientApp";
import { Flex, Icon, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsLink45Deg } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";

// CreatePostLink component to handle creating new posts
const CreatePostLink: React.FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);

  // Function to handle the "Create Post" button click
  const onClick = () => {
    if (!user) {
      // If user is not signed in, open the authentication modal to prompt login
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    // If user is signed in, redirect to the post creation page for the specified community
    const { communityId } = router.query;
    router.push(`/r/${communityId}/submit`);
  };

  return (
    // Create the "Create Post" link container with Chakra UI Flex component
    <Flex
      justify="space-evenly"
      align="center"
      bg="white"
      height="56px"
      borderRadius={4}
      border="1px solid"
      borderColor="gray.300"
      p={2}
      mb={4}
    >
      {/* Icon representing the Reddit logo */}
      <Icon as={FaReddit} fontSize={36} color="gray.300" mr={4} />

      {/* Input field for the "Create Post" link */}
      <Input
        placeholder="Create Post"
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
        bg="gray.50"
        borderColor="gray.200"
        height="36px"
        borderRadius={4}
        mr={4}
        onClick={onClick} // Handle click event on the "Create Post" link
      />

      {/* Icon for attaching images */}
      <Icon
        as={IoImageOutline}
        fontSize={24}
        mr={4}
        color="gray.400"
        cursor="pointer"
      />

      {/* Icon for adding links */}
      <Icon as={BsLink45Deg} fontSize={24} color="gray.400" cursor="pointer" />
    </Flex>
  );
};

export default CreatePostLink;
