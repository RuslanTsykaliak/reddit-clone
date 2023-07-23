import React, { useState } from "react";
import { Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { BsDot, BsReddit } from "react-icons/bs";
import { authModalState, ModalView } from "../../../atoms/authModalAtom";
import { auth } from "../../../firebase/clientApp";
import { useSetRecoilState } from "recoil";

// Defining the prop types for the ResetPassword component.
type ResetPasswordProps = {
  toggleView: (view: ModalView) => void;
};

const ResetPassword: React.FC<ResetPasswordProps> = ({ toggleView }) => {
  // Using the Recoil hook 'useSetRecoilState' to get the setter function for the 'authModalState' atom.
  const setAuthModalState = useSetRecoilState(authModalState);

  // State variables to handle the form inputs and success state after sending the reset email.
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  // Using the React Firebase hook 'useSendPasswordResetEmail' to get the function for sending password reset emails.
  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);

  // Function to handle form submission when the user requests a password reset.
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Sending the password reset email using Firebase's 'sendPasswordResetEmail' function.
    await sendPasswordResetEmail(email);
    setSuccess(true);
  };

  return (
    <Flex direction="column" alignItems="center" width="100%">
      <Icon as={BsReddit} color="brand.100" fontSize={40} mb={2} />
      <Text fontWeight={700} mb={2}>
        Reset your password
      </Text>
      {success ? (
        <Text mb={4}>Check your email :)</Text>
      ) : (
        <>
          <Text fontSize="sm" textAlign="center" mb={2}>
            Enter the email associated with your account, and we will send you a reset link.
          </Text>
          <form onSubmit={onSubmit} style={{ width: "100%" }}>
            <Input
              required
              name="email"
              placeholder="email"
              type="email"
              mb={2}
              onChange={(event) => setEmail(event.target.value)}
              fontSize="10pt"
              _placeholder={{ color: "gray.500" }}
              _hover={{
                bg: "white",
                border: "1px solid",
                borderColor: "blue.500",
              }}
              _focus={{
                outline: "none",
                bg: "white",
                border: "1px solid",
                borderColor: "blue.500",
              }}
              bg="gray.50"
            />
            <Text textAlign="center" fontSize="10pt" color="red">
              {error?.message}
            </Text>
            <Button
              width="100%"
              height="36px"
              mb={2}
              mt={2}
              type="submit"
              isLoading={sending}
            >
              Reset Password
            </Button>
          </form>
        </>
      )}
      <Flex
        alignItems="center"
        fontSize="9pt"
        color="blue.500"
        fontWeight={700}
        cursor="pointer"
      >
        {/* Clicking on these text elements sets the 'authModalState' to "login" or "signup" to switch views in the modal. */}
        <Text
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "login",
            }))
          }
        >
          LOGIN
        </Text>
        <Icon as={BsDot} />
        <Text
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "signup",
            }))
          }
        >
          SIGN UP
        </Text>
      </Flex>
    </Flex>
  );
};

export default ResetPassword;
