import React, { useState } from "react";
import CreateCommunityModal from "../../Modal/CreateCommunity/CreateCommunityModal";
import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";

type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
  // State to manage the visibility of the 'CreateCommunityModal' component
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 'CreateCommunityModal' component renders as a modal to create a new community */}
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />

      {/* Menu item for creating a new community */}
      <MenuItem
        width="100%"
        fontSize="10pt"
        _hover={{ bg: "gray.100" }}
        onClick={() => setOpen(true)} // Clicking opens the 'CreateCommunityModal'
      >
        <Flex align="center">
          <Icon fontSize={20} mr={2} as={GrAdd} /> {/* 'GrAdd' icon - plus sign */}
          Create Community
        </Flex>
      </MenuItem>
    </>
  );
};

export default Communities;
