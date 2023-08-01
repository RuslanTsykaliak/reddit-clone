import React from "react";
import { Flex, Icon, MenuItem, Image } from "@chakra-ui/react";
import { IconType } from "react-icons";
import useDirectory from "@/src/hooks/useDirectory"; // Custom hook to handle directory state or actions

type DirectoryItemProps = {
  displayText: string; // The text to be displayed for the item
  link: string; // The link associated with the item
  icon: IconType; // The icon component to be rendered for the item (from react-icons library)
  iconColor: string; // The color of the icon
  imageURL?: string; // An optional URL for an image to be displayed instead of an icon
};

const MenuListItem: React.FC<DirectoryItemProps> = ({
  displayText,
  link,
  icon,
  iconColor,
  imageURL,
}) => {
  const { onSelectMenuItem } = useDirectory(); // Custom hook to handle directory state or actions

  return (
    <MenuItem
      width="100%"
      fontSize="10pt"
      _hover={{ bg: "gray.100" }}
      onClick={() =>
        onSelectMenuItem({ displayText, link, icon, iconColor, imageURL })
      }
    >
      <Flex alignItems="center">
        {imageURL ? (
          // Display an image if imageURL is provided
          <Image borderRadius="full" boxSize="18px" src={imageURL} mr={2} />
        ) : (
          // Otherwise, display the provided icon
          <Icon fontSize={20} mr={2} as={icon} color={iconColor} />
        )}
        {displayText} {/* Display the text for the item */}
      </Flex>
    </MenuItem>
  );
};

export default MenuListItem;
