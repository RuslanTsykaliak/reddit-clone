import { communityState } from "@/src/atoms/communitiesAtom";
import About from "@/src/components/Community/About";
import PageContentLayout from "@/src/components/Layout/PageContent";
import NewPostForm from "@/src/components/Post/PostForm/NewPostForm";
import { auth } from "@/src/firebase/clientApp";
import useCommunityData from "@/src/hooks/useCommunityData";
import { Box, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";


// Import necessary libraries and hooks
const CreateCommmunityPostPage: NextPage = () => {
  // Fetch the user state, loading status, and error from useAuthState hook
  const [user, loadingUser, error] = useAuthState(auth);
  // Fetch the router instance from Next.js
  const router = useRouter();
  // Extract the "community" query parameter from the router
  const { community } = router.query;

  // Fetch the community state from Recoil and assign it to a variable
  // Note: The line below is commented out since it's not being used
  // const visitedCommunities = useRecoilValue(communityState).visitedCommunities;
  const communityStateValue = useRecoilValue(communityState);

  // Fetch the loading status from the custom hook useCommunityData
  const { loading } = useCommunityData();

  // Not sure why not working
  // Attempting to redirect user if not authenticated
  // Check if the user is not authenticated, loading user data is complete,
  // and the current community in the community state has an ID
  // If so, redirect the user to the community page
  useEffect(() => {
    if (!user && !loadingUser && communityStateValue.currentCommunity.id) {
      router.push(`/r/${communityStateValue.currentCommunity.id}`);
    }
  }, [user, loadingUser, communityStateValue.currentCommunity]);

  // Log the user and loadingUser values
  console.log("HERE IS USER", user, loadingUser);

  return (
    <PageContentLayout maxWidth="1060px">
      <>
        {/* Display a title for creating a post */}
        <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
          <Text fontWeight={600}>Create a post</Text>
        </Box>
        {/* Render the NewPostForm component if the user is authenticated */}
        {user && (
          <NewPostForm
            communityId={communityStateValue.currentCommunity.id}
            communityImageURL={communityStateValue.currentCommunity.imageURL}
            user={user}
          />
        )}
      </>
      {/* Render the About component if the current community in the community state is available */}
      {communityStateValue.currentCommunity && (
        <>
          <About
            communityData={communityStateValue.currentCommunity}
            pt={6}
            onCreatePage
            loading={loading}
          />
        </>
      )}
    </PageContentLayout>
  );
};

export default CreateCommmunityPostPage;
