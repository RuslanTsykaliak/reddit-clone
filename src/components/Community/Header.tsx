import React from "react";
import { Box, Button, Flex, Icon, Text, Image } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";
import { Community } from "@/src/atoms/communitiesAtom";
import useCommunityData from "@/src/hooks/useCommunityData";

type HeaderProps = {
  communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  // Custom hook to fetch and manage community data
  const { communityStateValue, loading, error, onJoinLeaveCommunity } =
    useCommunityData(!!communityData);

  // Check if the user has joined the community
  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  );

  return (
    <Flex direction="column" width="100%" height="146px">
      {/* Community banner */}
      <Box height="50%" bg="blue.400" />

      {/* Community information */}
      <Flex justifyContent="center" bg="white" height="50%">
        <Flex width="95%" maxWidth="860px">
          {/* Display community image if available, otherwise show a Reddit icon */}
          {communityStateValue.currentCommunity.imageURL ? (
            <Image
              borderRadius="full"
              boxSize="66px"
              src={communityStateValue.currentCommunity.imageURL}
              alt="Community Image"
              position="relative"
              top={-3}
              color="blue.500"
              border="4px solid white"
            />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position="relative"
              top={-3}
              color="blue.500"
              border="4px solid white"
              borderRadius="50%"
            />
          )}

          {/* Community name and join button */}
          <Flex padding="10px 16px">
            <Flex direction="column" mr={6}>
              {/* Display the community name */}
              <Text fontWeight={800} fontSize="16pt">
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize="10pt" color="gray.400">
                r/{communityData.id}
              </Text>
            </Flex>
            <Flex>
              {/* Join or Leave community button */}
              <Button
                variant={isJoined ? "outline" : "solid"}
                height="30px"
                pr={6}
                pl={6}
                onClick={() => onJoinLeaveCommunity(communityData, isJoined)}
                isLoading={loading}
              >
                {/* Show "Joined" or "Join" based on whether the user has joined the community */}
                {isJoined ? "Joined" : "Join"}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
