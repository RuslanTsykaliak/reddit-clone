import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/src/atoms/authModalAtom";
import { Post, postState } from "@/src/atoms/postsAtom";
import { firestore } from "@/src/firebase/clientApp";
import CommentItem, { Comment } from "./CommentItem";
import CommentInput from "./Input";

type CommentsProps = {
  user?: User | null;
  selectedPost: Post;
  community: string;
};

const Comments: React.FC<CommentsProps> = ({
  user,
  selectedPost,
  community,
}) => {
  // The Comments component represents the list of comments for a selected post.

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentFetchLoading, setCommentFetchLoading] = useState(false);
  const [commentCreateLoading, setCommentCreateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState("");
  const setAuthModalState = useSetRecoilState(authModalState);
  const setPostState = useSetRecoilState(postState);

  // Function to create a new comment
  const onCreateComment = async (comment: string) => {
    // Check if the user is authenticated
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    setCommentCreateLoading(true);
    try {
      const batch = writeBatch(firestore);

      // Create comment document
      const commentDocRef = doc(collection(firestore, "comments"));
      batch.set(commentDocRef, {
        postId: selectedPost.id,
        creatorId: user.uid,
        creatorDisplayText: user.email!.split("@")[0],
        creatorPhotoURL: user.photoURL,
        communityId: community, // Use the 'community' prop passed from the parent component
        text: comment,
        postTitle: selectedPost.title,
        createdAt: serverTimestamp(),
      } as Comment);

      // Update post numberOfComments
      batch.update(doc(firestore, "posts", selectedPost.id), {
        numberOfComments: increment(1),
      });
      await batch.commit();

      // Clear the comment input field after successfully creating the comment
      setComment("");

      // Add the newly created comment to the comments list
      const { id: postId, title } = selectedPost;
      setComments((prev) => [
        {
          id: commentDocRef.id,
          creatorId: user.uid,
          creatorDisplayText: user.email!.split("@")[0],
          creatorPhotoURL: user.photoURL,
          communityId: community,
          postId,
          postTitle: title,
          text: comment,
          createdAt: {
            seconds: Date.now() / 1000,
          },
        } as Comment,
        ...prev,
      ]);

      // Fetch posts again to update the number of comments
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! + 1,
        } as Post,
        postUpdateRequired: true,
      }));
    } catch (error: any) {
      console.log("onCreateComment error", error.message);
    }
    setCommentCreateLoading(false);
  };

  // Function to handle comment deletion
  const onDeleteComment = useCallback(
    async (comment: Comment) => {
      setDeleteLoading(comment.id as string);
      try {
        if (!comment.id) throw "Comment has no ID";
        const batch = writeBatch(firestore);
        const commentDocRef = doc(firestore, "comments", comment.id);
        batch.delete(commentDocRef);

        batch.update(doc(firestore, "posts", comment.postId), {
          numberOfComments: increment(-1),
        });

        await batch.commit();

        // Update the number of comments for the selected post
        setPostState((prev) => ({
          ...prev,
          selectedPost: {
            ...prev.selectedPost,
            numberOfComments: prev.selectedPost?.numberOfComments! - 1,
          } as Post,
          postUpdateRequired: true,
        }));

        // Remove the deleted comment from the comments list
        setComments((prev) => prev.filter((item) => item.id !== comment.id));
      } catch (error: any) {
        console.log("Error deleting comment", error.message);
      }
      setDeleteLoading("");
    },
    [setComments, setPostState]
  );

  // Function to fetch comments for the selected post
  const getPostComments = async () => {
    try {
      // Query the comments collection to get comments for the selected post
      const commentsQuery = query(
        collection(firestore, "comments"),
        where("postId", "==", selectedPost.id),
        orderBy("createdAt", "desc")
      );
      const commentDocs = await getDocs(commentsQuery);
      const comments = commentDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(comments as Comment[]);
    } catch (error: any) {
      console.log("getPostComments error", error.message);
    }
    setCommentFetchLoading(false);
  };

  useEffect(() => {
    // Fetch comments for the selected post when the component mounts
    getPostComments();
  }, []);

  return (
    <Box bg="white" p={2} borderRadius="0px 0px 4px 4px">
      <Flex
        direction="column"
        pl={10}
        pr={4}
        mb={6}
        fontSize="10pt"
        width="100%"
      >
        {/* Render the comment input component */}
        <CommentInput
          comment={comment}
          setComment={setComment}
          loading={commentCreateLoading}
          user={user}
          onCreateComment={onCreateComment}
        />
      </Flex>
      <Stack spacing={6} p={2}>
        {/* If comments are being fetched, show skeleton loaders */}
        {commentFetchLoading ? (
          <>
            {[0, 1, 2].map((item) => (
              <Box key={item} padding="6" bg="white">
                <SkeletonCircle size="10" />
                <SkeletonText mt="4" noOfLines={2} spacing="4" />
              </Box>
            ))}
          </>
        ) : (
          <>
            {/* If there are comments, render the CommentItem component for each comment */}
            {!!comments.length ? (
              <>
                {comments.map((item: Comment) => (
                  <CommentItem
                    key={item.id}
                    comment={item}
                    onDeleteComment={onDeleteComment}
                    isLoading={deleteLoading === (item.id as string)}
                    userId={user?.uid}
                  />
                ))}
              </>
            ) : (
              // If there are no comments, show a message
              <Flex
                direction="column"
                justify="center"
                align="center"
                borderTop="1px solid"
                borderColor="gray.100"
                p={20}
              >
                <Text fontWeight={700} opacity={0.3}>
                  No Comments Yet
                </Text>
              </Flex>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Comments;
