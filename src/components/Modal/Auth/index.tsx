// import {
//   useDisclosure,
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   ModalFooter,
//   Flex,
//   Text,
// } from "@chakra-ui/react";
// import React, { useEffect } from "react";
// import { useRecoilState } from "recoil";
// import { ModalView, authModalState } from "@/src/atoms/authModalAtom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "@/src/firebase/clientApp";
// import AuthInputs from "./Inputs";
// import OAuthButtons from "./OAuthButtons";
// import ResetPassword from "./ResetPassword";

// const AuthModal: React.FC = () => {
//   // Using the Recoil hook 'useRecoilState' to get the state and setter for the 'authModalState' atom.
//   const [modalState, setModalState] = useRecoilState(authModalState);

//   // Using the React Firebase hook 'useAuthState' to get the user's authentication state.
//   const [user, loading, error] = useAuthState(auth);

//   // Function to close the modal by updating the 'authModalState' to set 'open' to false.
//   const handleClose = () => {
//     setModalState((prev) => ({
//       ...prev,
//       open: false,
//     }));
//   };

//   const toggleView = (view: string) => {
//     setModalState({
//       ...modalState,
//       view: view as typeof modalState.view,
//     });
//   };

//   // useEffect hook to automatically close the modal when the user is logged in (user is not null).
//   useEffect(() => {
//     if (user) handleClose();
//     console.log("user", user);
//   }, [user]);

//   return (
//     <>
//       {/* Chakra UI Modal component */}
//       <Modal isOpen={modalState.open} onClose={handleClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader textAlign="center">
//             {/* Displaying the appropriate header based on the 'view' in 'authModalState' */}
//             {modalState.view === "login" && "Login"}
//             {modalState.view === "signup" && "Sign UP"}
//             {modalState.view === "resetPassword" && "Reset Password"}
//           </ModalHeader>
//           <ModalCloseButton />
//           <ModalBody
//             display="flex"
//             flexDirection="column"
//             alignItems="center"
//             justifyContent="center"
//             pb={6}
//           >
//             <Flex
//               direction="column"
//               align="center"
//               justify="center"
//               width="70%"
//             >
//               {modalState.view === "login" || modalState.view === "signup" ? (
//                 // Displaying OAuth buttons, "OR" text, and AuthInputs based on the current view.
//                 <>
//                   <OAuthButtons />
//                   <Text color="gray.500" fontWeight={700}>
//                     OR
//                   </Text>
//                   <AuthInputs />
//                 </>
//               ) : (
//                 // Displaying the ResetPassword component for the "resetPassword" view.
//                 <ResetPassword
//                   toggleView={function (view: ModalView): void {
//                     throw new Error("Function not implemented.");
//                   }}
//                 />
//               )}
//             </Flex>
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };
// export default AuthModal;

import React, { useEffect } from "react";
import {
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { authModalState } from "@/src/atoms/authModalAtom";
import { auth } from "@/src/firebase/clientApp";
import AuthInputs from "./Inputs";
import OAuthButtons from "./OAuthButtons";
import ResetPassword from "./ResetPassword";
import ModalWrapper from "../ModalWrapper";

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
  // Recoil state for managing the authentication modal
  const [modalState, setModalState] = useRecoilState(authModalState);

  // Function to close the authentication modal
  const handleClose = () =>
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));

  // Fetch the user data and any errors from Firebase authentication
  const [user, error] = useAuthState(auth);

  // Function to toggle between different views of the authentication modal (e.g., login, signup, resetPassword)
  const toggleView = (view: string) => {
    setModalState({
      ...modalState,
      view: view as typeof modalState.view,
    });
  };

  // useEffect hook to close the authentication modal when the user is logged in
  useEffect(() => {
    if (user) handleClose();
  }, [user]);

  return (
    <ModalWrapper isOpen={modalState.open} onClose={handleClose}>
      <ModalHeader display="flex" flexDirection="column" alignItems="center">
        {/* Display the appropriate header based on the current view */}
        {modalState.view === "login" && "Login"}
        {modalState.view === "signup" && "Sign Up"}
        {modalState.view === "resetPassword" && "Reset Password"}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        pb={6}
      >
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          width="70%"
        >
          {/* Render different components based on the current view */}
          {modalState.view === "login" || modalState.view === "signup" ? (
            <>
              {/* Render OAuthButtons and AuthInputs components for login and signup views */}
              <OAuthButtons />
              OR
              <AuthInputs toggleView={toggleView} />
            </>
          ) : (
            // Render the ResetPassword component for the resetPassword view
            <ResetPassword toggleView={toggleView} />
          )}
        </Flex>
      </ModalBody>
    </ModalWrapper>
  );
};
export default AuthModal;
