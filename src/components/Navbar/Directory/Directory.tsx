import { authModalState } from "@/src/atoms/authModalAtom";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Menu, MenuButton, MenuList, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import { TiHome } from "react-icons/ti";
import Communities from "./Communities";

const UserMenu: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  // Menu component for user actions (profile, log out) based on user authentication
  return (
    <Menu>
      {/* User menu button */}
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        mr={2}
        ml={{ base: 0, md: 2 }}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex align="center" justify="space-between" width={{ base: 'auto', lg: '200px' }}>
          <Flex align="center">
            {/* Using the TiHome icon from the react-icons library */}
            <Icon fontSize={24} mr={{ base: 1, md: 2 }} as={TiHome} />
            <Flex display={{ base: "none", lg: "flex" }}>
              <Text fontWeight={600} fontSize="10pt">
                Home
              </Text>
            </Flex>
          </Flex>
          {/* Chevron down icon for the dropdown menu */}
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      {/* The MenuList component, which will contain the actual menu items */}
      <MenuList>
        <Communities /> 
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
