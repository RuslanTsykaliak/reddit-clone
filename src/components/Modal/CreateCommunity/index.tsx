import { communityState } from "@/src/atoms/communitiesAtom";
import { firestore } from "@/src/firebase/clientApp";
import {
  Flex,
  Box,
  Button,
  Checkbox,
  Divider,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Stack,
  Text,
  Icon,
} from "@chakra-ui/react";
import {
  doc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore"; //
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { useSetRecoilState } from "recoil";
import ModalWrapper from "../ModalWrapper";

// Define the prop types for the CreateCommunityModal component.
type CreateCommunityModalProps = {
  isOpen: boolean; // Boolean flag to control the visibility of the modal
  handleClose: () => void; // Function to close the modal
  userId: string; // The ID of the user creating the community
};

// CreateCommunityModal component definition
const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  isOpen,
  handleClose,
  userId,
}) => {
  // Recoil state setter for managing community state
  const setSnippetState = useSetRecoilState(communityState);

  // Local state variables
  const [name, setName] = useState(""); // Community name
  const [charsRemaining, setCharsRemaining] = useState(21); // Remaining characters for the community name
  const [nameError, setNameError] = useState(""); // Error message for invalid community name
  const [communityType, setCommunityType] = useState("public"); // Selected community type
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter(); // Next.js router

  // Handle input change for the community name
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setName(event.target.value);
    setCharsRemaining(21 - event.target.value.length);
  };

  // Handle community creation when the "Create Community" button is clicked
  const handleCreateCommunity = async () => {
    if (nameError) setNameError("");
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;

    // Validate the community name
    if (format.test(name) || name.length < 3) {
      return setNameError(
        "Community names must be between 3–21 characters, and can only contain letters, numbers, or underscores."
      );
    }

    // Perform community creation transaction
    setLoading(true);
    try {
      // Create community document and communitySnippet subcollection document on user
      const communityDocRef = doc(firestore, "communities", name);
      await runTransaction(firestore, async (transaction) => {
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(`Sorry, /r${name} is taken. Try another.`);
        }

        transaction.set(communityDocRef, {
          creatorId: userId,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: "public",
        });

        transaction.set(
          doc(firestore, `users/${userId}/communitySnippets`, name),
          {
            communityId: name,
            isModerator: true,
          }
        );
      });
    } catch (error: any) {
      console.log("Transaction error", error);
      setNameError(error.message);
    }

    // Clear mySnippets state and close the modal
    setSnippetState((prev) => ({
      ...prev,
      mySnippets: [],
    }));
    handleClose();

    // Redirect to the newly created community page
    router.push(`r/${name}`);
    setLoading(false);
  };

  // Handle community type change when a checkbox is clicked
  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { name },
    } = event;
    if (name === communityType) return;
    setCommunityType(name);
  };

  // CreateCommunityModal UI components and layout
  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose}>
      <ModalHeader
        display="flex"
        flexDirection="column"
        fontSize={15}
        padding={3}
      >
        Create a community
      </ModalHeader>
      <Box pr={3} pl={3}>
        <Divider />
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column" padding="10px 0px">
          {/* Community Name Input */}
          <Text fontWeight={600} fontSize={15}>
            Name
          </Text>
          <Text fontSize={11} color="gray.500">
            Community names including capitalization cannot be changed
          </Text>
          <Text
            color="gray.400"
            position="relative"
            top="28px"
            left="10px"
            width="20px"
          >
            r/
          </Text>
          <Input
            position="relative"
            name="name"
            value={name}
            onChange={handleChange}
            pl="22px"
            type={""}
            size="sm"
          />
          <Text
            fontSize="9pt"
            color={charsRemaining === 0 ? "red" : "gray.500"}
            pt={2}
          >
            {charsRemaining} Characters remaining
          </Text>
          <Text fontSize="9pt" color="red" pt={1}>
            {nameError}
          </Text>
          <Box mt={4} mb={4}>
            {/* Community Type Selection */}
            <Text fontWeight={600} fontSize={15}>
              Community Type
            </Text>
            <Stack spacing={2} pt={1}>
              <Checkbox
                colorScheme="blue"
                name="public"
                isChecked={communityType === "public"}
                onChange={onCommunityTypeChange}
              >
                <Flex alignItems="center">
                  <Icon as={BsFillPersonFill} mr={2} color="gray.500" />
                  <Text fontSize="10pt" mr={1}>
                    Public
                  </Text>
                  <Text fontSize="8pt" color="gray.500" pt={1}>
                    Anyone can view, post, and comment to this community
                  </Text>
                </Flex>
              </Checkbox>
              <Checkbox
                colorScheme="blue"
                name="restricted"
                isChecked={communityType === "restricted"}
                onChange={onCommunityTypeChange}
              >
                <Flex alignItems="center">
                  <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                  <Text fontSize="10pt" mr={1}>
                    Restricted
                  </Text>
                  <Text fontSize="8pt" color="gray.500" pt={1}>
                    Anyone can view this community, but only approved users can
                    post
                  </Text>
                </Flex>
              </Checkbox>
              <Checkbox
                colorScheme="blue"
                name="private"
                isChecked={communityType === "private"}
                onChange={onCommunityTypeChange}
              >
                <Flex alignItems="center">
                  <Icon as={HiLockClosed} color="gray.500" mr={2} />
                  <Text fontSize="10pt" mr={1}>
                    Private
                  </Text>
                  <Text fontSize="8pt" color="gray.500" pt={1}>
                    Only approved users can view and submit to this community
                  </Text>
                </Flex>
              </Checkbox>
            </Stack>
          </Box>
        </ModalBody>
      </Box>
      <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
        {/* Modal buttons */}
        <Button variant="outline" height="30px" mr={2} onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="solid"
          height="30px"
          onClick={handleCreateCommunity}
          isLoading={loading}
        >
          Create Community
        </Button>
      </ModalFooter>
    </ModalWrapper>
  );
};

export default CreateCommunityModal;
