import React from "react";
import { Button, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";

const PersonalHome: React.FC = () => {
  // This component represents a personal homepage for a Reddit-like application.
  // It contains a header with the Reddit logo and "Home" text, as well as buttons for creating posts and communities.

  return (
    <Flex
      direction="column"
      bg="white"
      borderRadius={4}
      cursor="pointer"
      border="1px solid"
      borderColor="gray.300"
      position="sticky"
    >
      {/* Header with Reddit logo and "Home" text */}
      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        bg="blue.500"
        height="34px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={600}
        bgImage="url(/images/redditPersonalHome.png)"
        backgroundSize="cover"
      ></Flex>
      <Flex direction="column" p="12px">
        {/* Section with Reddit logo and "Home" text */}
        <Flex align="center" mb={2}>
          <Icon as={FaReddit} fontSize={50} color="brand.100" mr={2} />
          <Text fontWeight={600}>Home</Text>
        </Flex>
        {/* Section with a description of the personal Reddit frontpage */}
        <Stack spacing={3}>
          <Text fontSize="9pt">
            Your personal Reddit frontpage, built for you.
          </Text>
          {/* Button to create a new post */}
          <Button height="30px">Create Post</Button>
          {/* Button to create a new community */}
          <Button variant="outline" height="30px">
            Create Community
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default PersonalHome;
