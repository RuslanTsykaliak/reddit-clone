import { useEffect } from "react";
import { Stack } from "@chakra-ui/react";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import type { NextPage } from "next";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import { communityState } from "../atoms/communitiesAtom";
import { Post, PostVote } from "../atoms/postsAtom";
import CreatePostLink from "../components/Community/CreatePostLink";
import PageContentLayout from "../components/Layout/PageContent";
import PostLoader from "../components/Post/Loader";
import PostItem from "../components/Post/PostItem";
import { auth, firestore } from "../firebase/clientApp";
import usePosts from "../hooks/usePosts";
import PersonalHome from "../components/Community/PersonalHome";
import Premium from "../components/Community/Premium";
import Recommendations from "../components/Community/Recommendations";

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
    loading,
    setLoading,
  } = usePosts();
  const communityStateValue = useRecoilValue(communityState);

  const getUserHomePosts = async () => {
    // Set initial loading state to true
    setLoading(true);

    try {
      // Initialize an empty array to store feed posts
      const feedPosts: Post[] = [];

      // Check if the user has joined any communities
      if (communityStateValue.mySnippets.length > 0) {
        console.log("GETTING POSTS IN USER COMMUNITIES");

        // Extract the communityIds of the communities the user has joined
        const myCommunityIds = communityStateValue.mySnippets.map(
          (snippet) => snippet.communityId
        );

        // Create an array to store the promises for fetching posts from each community
        const postPromises: Array<Promise<QuerySnapshot<DocumentData>>> = [];

        // Fetch 3 posts from each community the user has joined
        myCommunityIds.forEach((communityId) => {
          postPromises.push(
            getDocs(
              query(
                collection(firestore, "posts"),
                where("communityId", "==", communityId),
                limit(3)
              )
            )
          );
        });

        // Wait for all the postPromises to resolve
        const queryResults = await Promise.all(postPromises);

        // Merge the posts from each community into the feedPosts array
        queryResults.forEach((result) => {
          const posts = result.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Post[];
          feedPosts.push(...posts);
        });
      } else {
        console.log("USER HAS NO COMMUNITIES - GETTING GENERAL POSTS");

        // If the user has not joined any communities, fetch general posts
        const postQuery = query(
          collection(firestore, "posts"),
          orderBy("voteStatus", "desc"),
          limit(10)
        );
        const getUserHomePosts = async () => {
          // Set initial loading state to true
          setLoading(true);

          try {
            // Initialize an empty array to store feed posts
            const feedPosts: Post[] = [];

            // Check if the user has joined any communities
            if (communityStateValue.mySnippets.length > 0) {
              console.log("GETTING POSTS IN USER COMMUNITIES");

              // Extract the communityIds of the communities the user has joined
              const myCommunityIds = communityStateValue.mySnippets.map(
                (snippet) => snippet.communityId
              );

              // Create an array to store the promises for fetching posts from each community
              const postPromises: Array<Promise<QuerySnapshot<DocumentData>>> =
                [];

              // Fetch 3 posts from each community the user has joined
              myCommunityIds.forEach((communityId) => {
                postPromises.push(
                  getDocs(
                    query(
                      collection(firestore, "posts"),
                      where("communityId", "==", communityId),
                      limit(3)
                    )
                  )
                );
              });

              // Wait for all the postPromises to resolve
              const queryResults = await Promise.all(postPromises);

              // Merge the posts from each community into the feedPosts array
              queryResults.forEach((result) => {
                const posts = result.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
                })) as Post[];
                feedPosts.push(...posts);
              });
            } else {
              console.log("USER HAS NO COMMUNITIES - GETTING GENERAL POSTS");

              // If the user has not joined any communities, fetch general posts
              const postQuery = query(
                collection(firestore, "posts"),
                orderBy("voteStatus", "desc"),
                limit(10)
              );
              const postDocs = await getDocs(postQuery);
              const posts = postDocs.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })) as Post[];
              feedPosts.push(...posts);
            }

            // Update the state with the fetched posts
            setPostStateValue((prev) => ({
              ...prev,
              posts: feedPosts,
            }));
          } catch (error: any) {
            console.log("getUserHomePosts error", error.message);
            // Handle errors here if needed
          }

          // Set loading state to false after fetching posts
          setLoading(false);
        };
        const postDocs = await getDocs(postQuery);
        const posts = postDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];
        feedPosts.push(...posts);
      }

      // Update the state with the fetched posts
      setPostStateValue((prev) => ({
        ...prev,
        posts: feedPosts,
      }));
    } catch (error: any) {
      console.log("getUserHomePosts error", error.message);
      // Handle errors here if needed
    }

    // Set loading state to false after fetching posts
    setLoading(false);
  };

  // Function to fetch posts when the user is not logged in
  const getNoUserHomePosts = async () => {
    console.log("GETTING NO USER FEED");
    setLoading(true);
    try {
      // Query for the latest 10 posts ordered by voteStatus
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteStatus", "desc"),
        limit(10)
      );
      const postDocs = await getDocs(postQuery);
      // Map the post documents to Post objects
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("NO USER FEED", posts);

      // Update the post state with the fetched posts
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error: any) {
      console.log("getNoUserHomePosts error", error.message);
    }
    // Set loading state to false after fetching posts
    setLoading(false);
  };

  // Function to fetch user post votes and update the post state
  const getUserPostVotes = async () => {
    // Get an array of post IDs from the current posts
    const postIds = postStateValue.posts.map((post) => post.id);
    // Query for user post votes using the post IDs
    const postVotesQuery = query(
      collection(firestore, `users/${user?.uid}/postVotes`),
      where("postId", "in", postIds)
    );
    // Subscribe to real-time updates on user post votes
    const unsubscribe = onSnapshot(postVotesQuery, (querySnapshot) => {
      // Map the query snapshot to PostVote objects
      const postVotes = querySnapshot.docs.map((postVote) => ({
        id: postVote.id,
        ...postVote.data(),
      }));

      // Update the post state with the user post votes
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: postVotes as PostVote[],
      }));
    });

    return () => unsubscribe();
  };

  // Initial useEffect to fetch user home posts when the component mounts or when the user state changes
  useEffect(() => {
    // If the initial snippets data has not been fetched yet, return early
    if (!communityStateValue.initSnippetsFetched) return;

    // If the user is logged in, fetch user home posts
    if (user) {
      getUserHomePosts();
    }
  }, [user, communityStateValue.initSnippetsFetched]);

  // useEffect to fetch no user posts when the user state or loadingUser state changes
  useEffect(() => {
    // If the user is not logged in and the loadingUser state is false, fetch no user posts
    if (!user && !loadingUser) {
      getNoUserHomePosts();
    }
  }, [user, loadingUser]);

  // useEffect to fetch user post votes when the post state or user state changes
  useEffect(() => {
    // If the user is not logged in or there are no posts, return early
    if (!user?.uid || !postStateValue.posts.length) return;
    // Fetch user post votes
    getUserPostVotes();

    // Clear postVotes on dismount by returning a cleanup function
    return () => {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
    };
  }, [postStateValue.posts, user?.uid]);

  // JSX rendering
  return (
    <PageContentLayout>
      <>
        <CreatePostLink />
        {/* Display loading spinner when loading, otherwise render the posts */}
        {loading ? (
          <PostLoader />
        ) : (
          <Stack>
            {postStateValue.posts.map((post: Post, index) => (
              <PostItem
                key={post.id}
                post={post}
                postIdx={index}
                onVote={onVote}
                onDeletePost={onDeletePost}
                userVoteValue={
                  postStateValue.postVotes.find(
                    (item) => item.postId === post.id
                  )?.voteValue
                }
                userIsCreator={user?.uid === post.creatorId}
                onSelectPost={onSelectPost}
                homePage
              />
            ))}
          </Stack>
        )}
      </>
      <Stack spacing={5} position="sticky" top="14px">
        {/* Render other components */}
        <Recommendations />
        <Premium />
        <PersonalHome />
      </Stack>
    </PageContentLayout>
  );
};

export default Home;
