import React from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { TabItemFrom } from "./NewPostForm";

// Define the props for the TabItem component
type TabItemProps = {
  // TabItem to TabItemFrom
  item: TabItemFrom; // The tab item object containing title and icon
  selected: boolean; // A boolean flag indicating whether this tab is currently selected
  setSelectedTab: (value: string) => void; // Function to set the selected tab title
};

// TabItem component declaration as a functional component
const TabItem: React.FC<TabItemProps> = ({
  item,
  selected,
  setSelectedTab,
}) => {
  return (
    <Flex
      key={item.title}
      justify="center"
      align="center"
      flexGrow={1}
      p="14px 0px"
      cursor="pointer"
      fontWeight={700}
      color={selected ? "blue.500" : "gray.500"}
      borderWidth={selected ? "0px 1px 2px 0px" : "0px 1px 1px 0px"}
      borderBottomColor={selected ? "blue.500" : "gray.200"}
      borderRightColor="gray.200"
      _hover={{ bg: "gray.50" }}
      onClick={() => setSelectedTab(item.title)}
    >
      <Flex align="center" height="20px" mr={2}>
        <Icon height="100%" as={item.icon} fontSize={18} />
      </Flex>
      <Text fontSize="10pt">{item.title}</Text>
    </Flex>
  );
};
export default TabItem;
