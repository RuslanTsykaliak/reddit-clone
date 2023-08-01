import React from "react";
import { Box, Flex } from "@chakra-ui/react";

interface PageContentLayoutProps extends React.PropsWithChildren<{}> {
  maxWidth?: string; // Optional maximum width for the layout
}

// Assumes array of two children are passed
const PageContentLayout: React.FC<PageContentLayoutProps> = ({
  children,
  maxWidth,
}) => {
  const childrenArray = React.Children.toArray(children) as React.ReactNode[];

  return (
    // Wrapper for centering and padding the content
    <Flex justify="center" p="16px 0px">
      <Flex width="95%" justify="center" maxWidth={maxWidth || "860px"}>
        <Flex
          direction="column"
          width={{ base: "100%", md: "65%" }}
          mr={{ base: 0, md: 6 }}
        >
          {childrenArray[0]}
        </Flex>
        {/* Right Content */}
        <Box
          display={{ base: "none", md: "flex" }}
          flexDirection="column"
          flexGrow={1}
        >
          {childrenArray[1]}
        </Box>
      </Flex>
    </Flex>
  );
};

export default PageContentLayout;
