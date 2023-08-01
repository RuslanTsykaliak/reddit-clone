import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import Link from "next/link";

const CommunityNotFound: React.FC = () => {
  const goBack = () => {
    window.history.back(); // Use the window.history API to go back to the last page
  };

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
    >
      <p>Sorry, that community does not exist or has been banned</p>
      <Link href="/">
        <Button mt={4}>GO HOME</Button>
      </Link>
      <Button mt={2} onClick={goBack}>
        GO BACK
      </Button>
    </Flex>
  );
};

export default CommunityNotFound;
