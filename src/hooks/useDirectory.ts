import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { communityState } from "../atoms/communitiesAtom";
import {
  defaultMenuItem,
  DirectoryMenuItem,
  directoryMenuState,
} from "../atoms/directoryMenuAtom";
import { FaReddit } from "react-icons/fa";

// Custom hook to handle the directory menu state and functionality
const useDirectory = () => {
  // Retrieve and update the directory menu state using Recoil
  const [directoryState, setDirectoryState] = useRecoilState(directoryMenuState);

  // Get the Next.js router instance
  const router = useRouter();

  // Get the current value of the community state using Recoil
  const communityStateValue = useRecoilValue(communityState);

  // Function to handle when a menu item in the directory is selected
  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    // Set the selected menu item in the state
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));

    // Navigate to the link associated with the selected menu item
    router?.push(menuItem.link);

    // Close the directory menu if it is open
    if (directoryState.isOpen) {
      toggleMenuOpen();
    }
  };

  // Function to toggle the open/close state of the directory menu
  const toggleMenuOpen = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: !directoryState.isOpen,
    }));
  };

  useEffect(() => {
    // Get the "community" query parameter from the router
    const { community } = router.query;

    // Get the existing community data from the community state using the ID
    const existingCommunity = communityStateValue.currentCommunity;

    // Check if the community data exists
    if (existingCommunity.id) {
      // If the community data exists, set the selected menu item in the state
      setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem: {
          displayText: `r/${existingCommunity.id}`,
          link: `r/${existingCommunity.id}`,
          icon: FaReddit,
          iconColor: "blue.500",
          imageURL: existingCommunity.imageURL,
        },
      }));
      return;
    }

    // If the community data does not exist, set the default menu item in the state
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: defaultMenuItem,
    }));
  }, [communityStateValue.currentCommunity]);
  //                              ^ used to be communityStateValue.vistedCommunities

  // Return the directory state and the functions for selecting and toggling menu items
  return { directoryState, onSelectMenuItem, toggleMenuOpen };
};

export default useDirectory;
