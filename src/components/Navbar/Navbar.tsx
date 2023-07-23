import { auth } from "@/src/firebase/clientApp";
import { Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Directory from "./Directory/Directory";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

const Navbar: React.FC = () => {
  // Get the authenticated user's state from Firebase using the useAuthState hook
  const [user, loading, error] = useAuthState(auth);

  return (
    // Top-level Flex container for the entire navbar
    <Flex bg="white" height="auto" padding="6px 12px" justify={{ md: 'space-between' }}>
      {/* Left-side content: Reddit logo and text */}
      <Flex align="center" width={{ base: '40px', md: 'auto' }}  mr={{ base: 0, md: 2 }} >
        <Image src="/images/redditFace.svg" height="30px" />
        {/* Display Reddit text (unhidden) on larger screens (md and above) */}
        <Image
          src="/images/redditText.svg"
          height="46px"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>

      {/* Directory component, potentially containing navigation links */}
      {user && <Directory />}

      {/* SearchInput component, a custom input field for searching */}
      <SearchInput user={user} />

      {/* RightContent component, containing user-related information */}
      <RightContent user={user} />
    </Flex>
  );
};

export default Navbar;
