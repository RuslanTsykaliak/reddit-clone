import React from "react";
import { MenuItem, Flex, Icon, Text, Box } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import MenuListItem from "./MenuListItem";
import { CommunitySnippet } from "@/src/atoms/communitiesAtom";

type MyCommunitiesProps = {
  snippets: CommunitySnippet[]; // An array of community snippets
  setOpen: (value: boolean) => void; // Function to open the menu
};

const MyCommunities: React.FC<MyCommunitiesProps> = ({ snippets, setOpen }) => {
  return (
    <Box mt={3} mb={3}>
      {/* Section title */}
      <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
        MY COMMUNITIES
      </Text>

      {/* Create Community option */}
      <MenuItem
        width="100%"
        fontSize="10pt"
        _hover={{ bg: "gray.100" }}
        onClick={() => setOpen(true)}
      >
        <Flex alignItems="center">
          <Icon fontSize={20} mr={2} as={GrAdd} />
          Create Community
        </Flex>
      </MenuItem>

      {/* Displaying the list of community snippets */}
      {snippets.map((snippet) => (
        <MenuListItem
          key={snippet.communityId}
          displayText={`r/${snippet.communityId}`}
          link={`r/${snippet.communityId}`}
          icon={FaReddit}
          iconColor="blue.500"
        />
      ))}
    </Box>
  );
};

export default MyCommunities;
