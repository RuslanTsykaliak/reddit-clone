import React from "react";
import { Stack, Box, SkeletonText, Skeleton } from "@chakra-ui/react";

const PostLoader: React.FC = () => {
  return (
    <Stack spacing={6}>
      {/* Placeholder for post item */}
      <Box padding="10px 10px" boxShadow="lg" bg="white" borderRadius={4}>
        {/* SkeletonText to represent the post title */}
        <SkeletonText mt="4" noOfLines={1} width="40%" spacing="4" />
        {/* SkeletonText to represent the post body */}
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
        {/* Skeleton to represent the post image */}
        <Skeleton mt="4" height="200px" />
      </Box>
      {/* Placeholder for another post item */}
      <Box padding="10px 10px" boxShadow="lg" bg="white" borderRadius={4}>
        {/* SkeletonText to represent the post title */}
        <SkeletonText mt="4" noOfLines={1} width="40%" spacing="4" />
        {/* SkeletonText to represent the post body */}
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
        {/* Skeleton to represent the post image */}
        <Skeleton mt="4" height="200px" />
      </Box>
    </Stack>
  );
};

export default PostLoader;
