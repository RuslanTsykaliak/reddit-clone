import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";
import { CommunitySnippet } from "@/src/atoms/communitiesAtom";
import MenuListItem from "./MenuListItem";

type ModeratingProps = {
  snippets: CommunitySnippet[]; // An array of community snippets that the user is moderating
};

const Moderating: React.FC<ModeratingProps> = ({ snippets }) => {
  return (
    <Box mt={3} mb={3}>
      {/* Section title */}
      <Text pl={3} mb={1} fontSize="7pt" fontWeight={500} color="gray.500">
        MODERATING
      </Text>

      {/* Displaying the list of communities being moderated */}
      {snippets.map((snippet) => (
        <MenuListItem
          key={snippet.communityId}
          displayText={`r/${snippet.communityId}`}
          link={`r/${snippet.communityId}`}
          icon={FaReddit}
          iconColor="brand.100"
        />
      ))}
    </Box>
  );
};

export default Moderating;
