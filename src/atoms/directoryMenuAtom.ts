import { atom } from "recoil";
import { IconType } from "react-icons";
import { TiHome } from "react-icons/ti";

// Define the type for each item in the directory menu
export type DirectoryMenuItem = {
  displayText: string;   // The text to display for the menu item
  link: string;          // The URL link the menu item points to
  icon: IconType;        // The React icon component to display for the menu item
  iconColor: string;     // The color of the icon for the menu item
  imageURL?: string;     // An optional URL for an image to display for the menu item
};

// Define the state shape for the directory menu
interface DirectoryMenuState {
  isOpen: boolean;                 // A flag to indicate if the menu is open or closed
  selectedMenuItem: DirectoryMenuItem; // The currently selected menu item
}

// Define the default menu item (Home) to use when no item is selected
export const defaultMenuItem = {
  displayText: "Home",
  link: "/",
  icon: TiHome,           // Use the TiHome icon from react-icons library
  iconColor: "black",     // Set the default icon color to black
};

// Define the default state for the directory menu
export const defaultMenuState: DirectoryMenuState = {
  isOpen: false,                  // Default menu state is closed
  selectedMenuItem: defaultMenuItem, // Set the default selected menu item to "Home"
};

// Define the Recoil atom to manage the state of the directory menu
export const directoryMenuState = atom({
  key: "directoryMenuState",   // Unique identifier for the atom
  default: defaultMenuState,   // Set the default state for the atom
});
