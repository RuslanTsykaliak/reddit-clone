import { ModalView, authModalState } from "@/src/atoms/authModalAtom";
import { auth } from "@/src/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/src/firebase/errors";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import InputItem from "../../Layout/InputItem";

type LoginProps = {
  toggleView: (view: ModalView) => void; // Function to toggle the authentication modal view
};

const Login: React.FC<LoginProps> = ({ toggleView }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");

  const [signInWithEmailAndPassword, _, loading, authError] =
    useSignInWithEmailAndPassword(auth);

  // Firebase logic: Handles the login process
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formError) setFormError("");
    if (!form.email.includes("@")) {
      return setFormError("Please enter a valid email");
    }

    // Valid form inputs, attempt to sign in with email and password
    signInWithEmailAndPassword(form.email, form.password);
  };

  // Update form state: Handles input change
  const onChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      {/* Input items for email and password */}
      <InputItem
        name="email"
        placeholder="email"
        type="text"
        mb={2}
        onChange={onChange}
      />
      <InputItem
        name="password"
        placeholder="password"
        type="password"
        onChange={onChange}
      />

      {/* Display error message if there's an authentication error */}
      <Text textAlign="center" mt={2} fontSize="10pt" color="red">
        {formError ||
          FIREBASE_ERRORS[authError?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>

      {/* Login button */}
      <Button
        width="100%"
        height="36px"
        mb={2}
        mt={2}
        type="submit"
        isLoading={loading}
      >
        Log In
      </Button>

      {/* Forgot password */}
      <Flex justifyContent="center" mb={2}>
        <Text fontSize="9pt" mr={1}>
          Forgot your password?
        </Text>
        <Text
          fontSize="9pt"
          color="blue.500"
          cursor="pointer"
          onClick={() => toggleView("resetPassword")}
        >
          Reset
        </Text>
      </Flex>

      {/* Sign up */}
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>New here?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() => toggleView("signup")}
        >
          SIGN UP
        </Text>
      </Flex>
    </form>
  );
};

export default Login;


//   return (
//     <form onSubmit={onSubmit}>
//       <Input
//         required
//         name="email"
//         placeholder="email"
//         type="email"
//         mb={2}
//         onChange={onChange}
//         fontSize="10pt"
//         _placeholder={{ color: "gray.500" }}
//         _hover={{
//           bg: "white",
//           border: "1px solid",
//           borderColor: "blue.500",
//         }}
//         _focus={{
//           outline: "none",
//           bg: "white",
//           border: "1px solid",
//           borderColor: "blue.500",
//         }}
//         bg="gray.50"
//       />
//       <Input
//         required
//         name="password"
//         onChange={onChange}
//         placeholder="password"
//         type="password"
//         mb={2}
//         fontSize="10pt"
//         _placeholder={{ color: "gray.500" }}
//         _hover={{
//           bg: "white",
//           border: "1px solid",
//           borderColor: "blue.500",
//         }}
//         _focus={{
//           outline: "none",
//           bg: "white",
//           border: "1px solid",
//           borderColor: "blue.500",
//         }}
//         bg="gray.50"
//       />
//       <Text textAlign="center" color="red" fontSize="10pt">
//         {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
//       </Text>
//       <Button
//         width="100%"
//         height="36px"
//         mt={2}
//         mb={2}
//         type="submit"
//         isLoading={loading}
//       >
//         Log In
//       </Button>
//       <Flex justifyContent="center" mb={2}>
//         <Text fontSize="9pt" mr={1}>
//           Forgot your password?
//         </Text>
//         <Text
//           fontSize="9pt"
//           color="blue.500"
//           cursor="pointer"
//           onClick={() => toggleView("resetPassword")}
//         >
//           Reset
//         </Text>
//       </Flex>
//       <Flex fontSize="9pt" justifyContent="center">
//         <Text mr={1}>New here?</Text>
//         <Text
//           color="blue.500"
//           fontWeight={700}
//           cursor="pointer"
//           onClick={() => toggleView("signup")}
//         >
//           SIGN UP
//         </Text>
//       </Flex>
//     </form>
//   );
// };

// export default Login;
// function setForm(arg0: (prev: any) => any) {
//   throw new Error("Function not implemented.");
// }
