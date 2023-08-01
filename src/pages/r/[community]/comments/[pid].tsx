import React, { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { Post } from "@/src/atoms/postsAtom";
import About from "@/src/components/Community/About";
import PageContentLayout from "@/src/components/Layout/PageContent";
import Comments from "@/src/components/Post/Comments";
import PostLoader from "@/src/components/Post/Loader";
import PostItem from "@/src/components/Post/PostItem";
import { auth, firestore } from "@/src/firebase/clientApp";
import useCommunityData from "@/src/hooks/useCommunityData";
import usePosts from "@/src/hooks/usePosts";

type PostPageProps = {};

const PostPage: React.FC<PostPageProps> = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { community, pid } = router.query;
  const { communityStateValue } = useCommunityData();

  // Need to pass community data here to see if the current post [pid] has been voted on
  const {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    loading,
    setLoading,
    onVote,
  } = usePosts(communityStateValue.currentCommunity);

  const fetchPost = async () => {
    console.log("FETCHING POST");

    setLoading(true);
    try {
      const postDocRef = doc(firestore, "posts", pid as string);
      const postDoc = await getDoc(postDocRef);
      // Set the fetched post data to the state
      setPostStateValue((prev) => ({
        ...prev,
        selectedPost: { id: postDoc.id, ...postDoc.data() } as Post,
      }));
    } catch (error: any) {
      console.log("fetchPost error", error.message);
    }
    setLoading(false);
  };

  // Fetch post if not already in state
  useEffect(() => {
    const { pid } = router.query;

    // Check if the post is not in the state and fetch it if needed
    if (pid && !postStateValue.selectedPost) {
      fetchPost();
    }
  }, [router.query, postStateValue.selectedPost]);

  return (
    <PageContentLayout>
      {/* Left Content */}
      <>
        {loading ? (
          // Display a loader while the post is being fetched
          <PostLoader />
        ) : (
          <>
            {/* Display the post item and comments if the post data is available */}
            {postStateValue.selectedPost && (
              <>
                {/* Render the PostItem component */}
                <PostItem
                  post={postStateValue.selectedPost}
                  // postIdx={postStateValue.selectedPost.postIdx}
                  onVote={onVote}
                  onDeletePost={onDeletePost}
                  userVoteValue={
                    // Get the user's vote value for this post (upvoted, downvoted, or null)
                    postStateValue.postVotes.find(
                      (item) => item.postId === postStateValue.selectedPost!.id
                    )?.voteValue
                  }
                  userIsCreator={
                    // Check if the user is the creator of the post
                    user?.uid === postStateValue.selectedPost.creatorId
                  }
                  router={router}
                />
                {/* Render the Comments component */}
                <Comments
                  user={user}
                  community={community as string}
                  selectedPost={postStateValue.selectedPost}
                />
              </>
            )}
          </>
        )}
      </>
      {/* Right Content */}
      <>
        {/* Render the About component */}
        <About
          communityData={
            communityStateValue.currentCommunity
            // communityStateValue.visitedCommunities[community as string]
          }
          loading={loading}
        />
      </>
    </PageContentLayout>
  );
};

export default PostPage;
