import { atom } from "recoil";
import { FieldValue, Timestamp } from "firebase/firestore";

// Interface representing a community object
export interface Community {
  id: string; // Unique identifier for the community
  creatorId: string; // ID of the user who created the community
  numberOfMembers: number; // Number of members in the community
  privacyType: "public" | "restricted" | "private"; // Type of privacy for the community
  createdAt?: Timestamp; // Optional timestamp for community creation
  imageURL?: string; // Optional URL for the community's image
}

// Interface representing a community snippet object
export interface CommunitySnippet {
  communityId: string; // ID of the community the snippet represents
  isModerator?: boolean; // Optional flag indicating if the user is a moderator
  imageURL?: string; // Optional URL for the community snippet's image
}

// Interface representing the state object for community-related data
interface CommunityState {
  [key: string]:
    | CommunitySnippet[] // Array of community snippets
    | { [key: string]: Community } // Object containing communities with their IDs as keys
    | Community // Single community object
    | boolean // Boolean value for certain flags
    | undefined; // Undefined value for optional properties
  mySnippets: CommunitySnippet[]; // Array of community snippets related to the user
  initSnippetsFetched: boolean; // Flag indicating if initial snippets are fetched
  visitedCommunities: {
    // Object containing visited communities with their IDs as keys
    [key: string]: Community;
  };
  currentCommunity: Community; // The currently selected community object
}

// Default community object
export const defaultCommunity: Community = {
  id: "",
  creatorId: "",
  numberOfMembers: 0,
  privacyType: "public",
};

// Default state object for community-related data
export const defaultCommunityState: CommunityState = {
  mySnippets: [], // Empty array of user's community snippets
  initSnippetsFetched: false, // Flag initially set to false
  visitedCommunities: {}, // Empty object for visited communities
  currentCommunity: defaultCommunity, // Default community object
};

// Atom representing the community state in Recoil
export const communityState = atom<CommunityState>({
  key: "communitiesState",
  default: defaultCommunityState, // Default state object for the atom
});
