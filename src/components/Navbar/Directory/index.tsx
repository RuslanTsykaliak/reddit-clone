import React, { useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Image,
} from "@chakra-ui/react";
import useDirectory from "@/src/hooks/useDirectory"; // Custom hook to handle directory state or actions
import Communities from "./Communities"; // Component that renders the list of communities

const Directory: React.FC = () => {
  const [open, setOpen] = useState(false); // Local state to manage the open/close state of the dropdown
  const handleClose = () => setOpen(false); // Function to handle closing the dropdown

  const { directoryState, toggleMenuOpen } = useDirectory(); // Custom hook to handle directory state or actions

  return (
    <Menu isOpen={directoryState.isOpen}>
      {({ isOpen }) => (
        <>
          {/* MenuButton is the trigger for the dropdown */}
          <MenuButton
            cursor="pointer"
            padding="0px 6px"
            borderRadius="4px"
            _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
            mr={2}
            ml={{ base: 0, md: 2 }}
            onClick={toggleMenuOpen} // Toggles the dropdown menu open/close state
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              width={{ base: "auto", lg: "200px" }}
            >
              <Flex alignItems="center">
                <>
                  {directoryState.selectedMenuItem.imageURL ? (
                    // Display an image if imageURL is provided
                    <Image
                      borderRadius="full"
                      boxSize="24px"
                      src={directoryState.selectedMenuItem.imageURL}
                      mr={2}
                    />
                  ) : (
                    // Otherwise, display the provided icon
                    <Icon
                      fontSize={24}
                      mr={{ base: 1, md: 2 }}
                      color={directoryState.selectedMenuItem.iconColor}
                      as={directoryState.selectedMenuItem.icon}
                    />
                  )}
                  <Box
                    display={{ base: "none", lg: "flex" }}
                    flexDirection="column"
                    fontSize="10pt"
                  >
                    <Text fontWeight={600}>
                      {directoryState.selectedMenuItem.displayText}{" "}
                      {/* Display the text for the selected menu item */}
                    </Text>
                  </Box>
                </>
              </Flex>
              <ChevronDownIcon color="gray.500" />{" "}
              {/* ChevronDownIcon to indicate the dropdown */}
            </Flex>
          </MenuButton>
          {/* MenuList contains the dropdown menu items */}
          <MenuList maxHeight="300px" overflow="scroll" overflowX="hidden">
            <Communities menuOpen={isOpen} />{" "}
            {/* Render the list of communities */}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default Directory;

// import { authModalState } from "@/src/atoms/authModalAtom";
// import { ChevronDownIcon } from "@chakra-ui/icons";
// import { Flex, Menu, MenuButton, MenuList, Icon, Text } from "@chakra-ui/react";
// import React from "react";
// import { useSetRecoilState } from "recoil";
// import { TiHome } from "react-icons/ti";
// import Communities from "./Communities";

// const UserMenu: React.FC = () => {
//   const setAuthModalState = useSetRecoilState(authModalState);

//   // Menu component for user actions (profile, log out) based on user authentication
//   return (
//     <Menu>
//       {/* User menu button */}
//       <MenuButton
//         cursor="pointer"
//         padding="0px 6px"
//         borderRadius={4}
//         mr={2}
//         ml={{ base: 0, md: 2 }}
//         _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
//       >
//         <Flex align="center" justify="space-between" width={{ base: 'auto', lg: '200px' }}>
//           <Flex align="center">
//             {/* Using the TiHome icon from the react-icons library */}
//             <Icon fontSize={24} mr={{ base: 1, md: 2 }} as={TiHome} />
//             <Flex display={{ base: "none", lg: "flex" }}>
//               <Text fontWeight={600} fontSize="10pt">
//                 Home
//               </Text>
//             </Flex>
//           </Flex>
//           {/* Chevron down icon for the dropdown menu */}
//           <ChevronDownIcon />
//         </Flex>
//       </MenuButton>
//       {/* The MenuList component, which will contain the actual menu items */}
//       <MenuList>
//         <Communities menuOpen={false} />
//       </MenuList>
//     </Menu>
//   );
// };

// export default UserMenu;
