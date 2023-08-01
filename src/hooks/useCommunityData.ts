import { useEffect, useState } from "react";
import { doc, getDoc, increment, writeBatch } from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "../atoms/authModalAtom";
import {
  Community,
  CommunitySnippet,
  communityState,
  defaultCommunity,
} from "../atoms/communitiesAtom";
import { auth, firestore } from "../firebase/clientApp";
import { getMySnippets } from "../helpers/firestore";

// Add ssrCommunityData near end as small optimization
const useCommunityData = (ssrCommunityData?: boolean) => {
  // Retrieve the user and router instances from React hooks
  const [user] = useAuthState(auth);
  const router = useRouter();

  // Retrieve and update the community state using Recoil
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);

  // Set the authentication modal state using Recoil
  const setAuthModalState = useSetRecoilState(authModalState);

  // Initialize loading and error state variables using React hooks
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch snippets data when the user is available and snippets data is not already present
    if (!user || !!communityStateValue.mySnippets.length) return;
    getSnippets();
  }, [user]);

  // Function to fetch the user's snippets data
  const getSnippets = async () => {
    setLoading(true);
    try {
      const snippets = await getMySnippets(user?.uid!);
      // Update the community state with the fetched snippets data
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
        initSnippetsFetched: true,
      }));
      setLoading(false);
    } catch (error: any) {
      console.log("Error getting user snippets", error);
      setError(error.message);
    }
    setLoading(false);
  };

  // Function to fetch community data based on the community ID
  const getCommunityData = async (communityId: string) => {
    // Fetch the community document from Firestore
    console.log("GETTING COMMUNITY DATA");
    try {
      const communityDocRef = doc(
        firestore,
        "communities",
        communityId as string
      );
      const communityDoc = await getDoc(communityDocRef);

      // Update the community state with the fetched community data
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          id: communityDoc.id,
          ...communityDoc.data(),
        } as Community,
      }));
    } catch (error: any) {
      console.log("getCommunityData error", error.message);
    }
    setLoading(false);
  };

  // Function to handle user joining or leaving a community
  const onJoinLeaveCommunity = (community: Community, isJoined?: boolean) => {
    console.log("ON JOIN LEAVE", community.id);

    // Show the authentication modal if the user is not logged in
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    setLoading(true);
    if (isJoined) {
      leaveCommunity(community.id);
      return;
    }
    joinCommunity(community);
  };

  // Function to handle user joining a community
  const joinCommunity = async (community: Community) => {
    console.log("JOINING COMMUNITY: ", community.id);
    try {
      const batch = writeBatch(firestore);

      // Create a new snippet with the community data
      const newSnippet: CommunitySnippet = {
        communityId: community.id,
        imageURL: community.imageURL || "",
      };
      // Add the new snippet to the user's collection in Firestore
      batch.set(
        doc(firestore, `users/${user?.uid}/communitySnippets`, community.id),
        newSnippet
      );

      // Increment the number of members in the community document
      batch.update(doc(firestore, "communities", community.id), {
        numberOfMembers: increment(1),
      });

      // Perform the batch writes
      await batch.commit();

      // Add the current community to the snippet in the community state
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error) {
      console.log("joinCommunity error", error);
    }
    setLoading(false);
  };

  // Function to handle user leaving a community
  const leaveCommunity = async (communityId: string) => {
    try {
      const batch = writeBatch(firestore);

      // Delete the user's snippet for the community from Firestore
      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets/${communityId}`)
      );

      // Decrement the number of members in the community document
      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      });

      // Perform the batch writes
      await batch.commit();

      // Update the community state by removing the community snippet
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
      }));
    } catch (error) {
      console.log("leaveCommunity error", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Fetch the community data when the "community" query parameter is available in the router
    const { community } = router.query;
    if (community) {
      const communityData = communityStateValue.currentCommunity;
      if (!communityData.id) {
        // Fetch the community data if it doesn't exist in the community state
        getCommunityData(community as string);
        return;
      }
    } else {
      // Set the current community to the default community if the "community" query parameter is not available
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: defaultCommunity,
      }));
    }
  }, [router.query, communityStateValue.currentCommunity]);

  // Return the community state and the functions for joining/leaving communities
  return {
    communityStateValue,
    onJoinLeaveCommunity,
    loading,
    setLoading,
    error,
  };
};

export default useCommunityData;

/** 
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";
import {
  Community,
  CommunitySnippet,
  communityState,
  defaultCommunity,
} from "../atoms/communitiesAtom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import { authModalState } from "../atoms/authModalAtom";
import router, { useRouter } from "next/router";

const useCommunityData = () => {
  // State variables and hooks
  const [user, loadingUser] = useAuthState(auth); // Get the currently logged-in user
  const router = useRouter(); // Access the Next.js router object
  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState); // Recoil state for managing community data

  const setAuthModalState = useSetRecoilState(authModalState); // Recoil state for managing authentication modal
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state

  // Fetch user's snippets when user changes or component mounts
  useEffect(() => {
    // If the user is not logged in or snippets are already loaded, return early
    if (!user || !!communityStateValue.mySnippets.length) return;

    // Fetch the user's snippets from Firestore
    getMySnippet();
  }, [user]);

  // Fetch user's snippets from Firestore
  const getMySnippet = async () => {
    setLoading(true); // Set loading state to true
    try {
      // Get the user's snippets from Firestore collection
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );
      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      // Update the Recoil state with the user's snippets
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
      }));
    } catch (error: any) {
      console.log("getMySnippets error", error);
      setError(error.message); // Set the error state in case of an error
    }
    setLoading(false); // Set loading state back to false
  };

  // Fetch community data when the component mounts or query param changes
  useEffect(() => {
    // if (ssrCommunityData) return;
    const { community } = router.query; // Get the 'community' query parameter from the router
    if (community) {
      const communityData = communityStateValue.currentCommunity;

      // If community data is not already loaded, fetch it from Firestore
      if (!communityData.id) {
        getCommunityData(community as string);
        return;
      }
    } else {
      // If there is no 'community' query parameter, set the default community in Recoil state
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: defaultCommunity,
      }));
    }
  }, [router.query, communityStateValue.currentCommunity]);

  // Fetch community data from Firestore
  const getCommunityData = async (communityId: string) => {
    console.log("GETTING COMMUNITY DATA");

    try {
      // Get the community document from Firestore
      const communityDocRef = doc(
        firestore,
        "communities",
        communityId as string
      );
      const communityDoc = await getDoc(communityDocRef);
      // Update Recoil state with the fetched community data
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          id: communityDoc.id,
          ...communityDoc.data(),
        } as Community,
      }));
    } catch (error: any) {
      console.log("getCommunityData error", error.message);
    }
    setLoading(false);
  };

  // Handle join or leave community action
  const onJoinLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    // Check if the user is signed in
    if (!user) {
      // If not, open the authentication modal
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    // If the user is signed in, proceed to join or leave the community
    if (isJoined) {
      leaveCommunity(communityData.id); // Now, 'leaveCommunity' is accessible here
      return;
    }
    joinCommunity(communityData);
  };

  const joinCommunity = (communityData: Community) => {
    // Batch write to perform multiple Firestore operations atomically
    try {
      const batch = writeBatch(firestore);

      // Create a new community snippet for the user
      const newSnippet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
      };
      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id
        ),
        newSnippet
      );

      // Increment the numberOfMembers of the community by 1
      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMembers: increment(1),
      });

      // Commit the batch to execute all operations atomically
      batch.commit();

      // Update recoil state - add the newSnippet to the user's community snippets
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.log("joinCommunity error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  const leaveCommunity = async (communityId: string) => {
    // Batch write to perform multiple Firestore operations atomically

    try {
      const batch = writeBatch(firestore);

      // Delete the community snippet from the user's data
      batch.delete(
        doc(firestore, `users${user?.uid}/communitySnippets`, communityId)
      );

      // Decrement the numberOfMembers of the community by 1
      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      });

      // Commit the batch to execute all operations atomically
      await batch.commit();

      // Update recoil state - remove the community snippet from the user's snippets
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
      }));
    } catch (error: any) {
      console.log("leaveCommunity error", error.message);
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    // When the user changes, update the user's snippets
    if (!user) {
      setCommunityStateValue((prev) => ({
        ...prev,
        mySnippets: [],
      }));
      return;
    }
    getMySnippet();
  }, [user]);

  // Fetch and update current community data when the 'community' query parameter changes or on component mount
  useEffect(() => {
    const { community } = router.query; // Get the value of the 'community' query parameter from the router

    // If the 'community' query parameter exists
    if (community) {
      const communityData = communityStateValue.currentCommunity;

      // If the current community data is not already loaded (missing 'id' field)
      if (!communityData.id) {
        getCommunityData(community as string); // Fetch the community data using the 'community' ID
        return;
      }
    } else {
      // If there is no 'community' query parameter, set the default community in Recoil state
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: defaultCommunity,
      }));
    }
  }, [router.query, communityStateValue.currentCommunity]);

  return {
    // Expose data and functions to the component that uses this hook
    communityStateValue,
    onJoinLeaveCommunity,
    loading,
    setLoading,
    error,
  };
};

export default useCommunityData;
*/
