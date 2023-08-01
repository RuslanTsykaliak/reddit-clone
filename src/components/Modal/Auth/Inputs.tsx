import { authModalState, ModalView } from "@/src/atoms/authModalAtom";
import { Flex } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import Login from "./Login";
import SignUp from "./SignUp";

type AuthInputsProps = {
    toggleView: (view: ModalView) => void;
  };
  
  // AuthInputs component receives the toggleView function to switch between login and signup views
  const AuthInputs: React.FC<AuthInputsProps> = ({ toggleView }) => {
    // Fetch the current modal state using Recoil's useRecoilValue hook
    const modalState = useRecoilValue(authModalState);
  
    return (
      <Flex direction="column" alignItems="center" width="100%" mt={4}>
        {/* Conditional rendering based on the modalState.view */}
        {modalState.view === "login" ? (
          // Render the Login component if the view is "login"
          <Login toggleView={toggleView} />
        ) : (
          // Render the SignUp component if the view is "signup"
          <SignUp toggleView={toggleView} />
        )}
      </Flex>
    );
  };
  
  export default AuthInputs;
  
  
