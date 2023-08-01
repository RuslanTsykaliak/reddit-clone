import { Button, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { ModalView } from "@/src/atoms/authModalAtom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/src/firebase/errors";
import InputItem from "../../Layout/InputItem";

type SignUpProps = {
  toggleView: (view: ModalView) => void;
};

const SignUp: React.FC<SignUpProps> = ({ toggleView }) => {
  // State to manage the form inputs
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State to handle form submission errors
  const [formError, setFormError] = useState("");

  // React Firebase hook to create a user with email and password
  const [createUserWithEmailAndPassword, _, loading, authError] =
    useCreateUserWithEmailAndPassword(auth);

  // Function to handle form submission
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formError) setFormError("");

    // Validate email input
    if (!form.email.includes("@")) {
      return setFormError("Please enter a valid email");
    }

    // Validate password and confirm password inputs
    if (form.password !== form.confirmPassword) {
      return setFormError("Passwords do not match");
    }

    // Valid form inputs, create the user with email and password
    createUserWithEmailAndPassword(form.email, form.password);
  };

  // Function to handle input changes
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
      {/* Input components for email, password, and confirm password */}
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
        mb={2}
        onChange={onChange}
      />
      <InputItem
        name="confirmPassword"
        placeholder="confirm password"
        type="password"
        onChange={onChange}
      />

      {/* Display form submission error message, if any */}
      <Text textAlign="center" mt={2} fontSize="10pt" color="red">
        {formError ||
          FIREBASE_ERRORS[authError?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>

      {/* Sign Up button */}
      <Button
        width="100%"
        height="36px"
        mb={2}
        mt={2}
        type="submit"
        isLoading={loading}
      >
        Sign Up
      </Button>

      {/* Option to toggle to the login view */}
      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>Have an account?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() => toggleView("login")}
        >
          LOG IN
        </Text>
      </Flex>
    </form>
  );
};
export default SignUp;

// const SignUP: React.FC = () => {
//   // Recoil state for handling authentication modal
//   const setAuthModalState = useSetRecoilState(authModalState);

//   // State for storing form input values
//   const [signUpForm, setSignUpForm] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [error, setError] = useState("");

//   // Firebase hook for creating a user with email and password
//   const [createUserWithEmailAndPassword, userCred, loading, userError] =
//     useCreateUserWithEmailAndPassword(auth);

//   // Function to handle form submission
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (error) setError("");
//     if (signUpForm.password !== signUpForm.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }
//     // Passwords match, create user with email and password
//     createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
//   };
//   // Function to handle changes in input fields
//   const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     // Update form state
//     setSignUpForm((prev: any) => ({
//       ...prev,
//       [event.target.name]: event.target.value,
//     }));
//   };

//   const createUserDocument = async (user: User) => {
//     await addDoc(
//       collection(firestore, "users"),
//       JSON.parse(JSON.stringify(user))
//     );
//   };

//   // useEffect to create user document when userCred changes
//   useEffect(() => {
//     if (userCred) {
//       createUserDocument(userCred.user);
//     }
//   }, [userCred]);

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
//       <Input
//         required
//         name="confirmPassword"
//         onChange={onChange}
//         placeholder="confirm password"
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
//       {userError?.message && (
//         <Text textAlign="center" color="red" fontSize="10pt">
//           {FIREBASE_ERRORS[userError.message as keyof typeof FIREBASE_ERRORS]}
//         </Text>
//       )}
//       <Button
//         width="100%"
//         height="36px"
//         mt={2}
//         mb={2}
//         type="submit"
//         isLoading={loading}
//       >
//         Sign Up
//       </Button>
//       <Flex fontSize="9pt" justifyContent="center">
//         <Text mr={1}>Already a redditor?</Text>
//         <Text
//           color="blue.500"
//           fontWeight={700}
//           cursor="pointer"
//           onClick={() =>
//             setAuthModalState((prev: any) => ({
//               ...prev,
//               view: "login",
//             }))
//           }
//         >
//           LOG IN
//         </Text>
//       </Flex>
//     </form>
//   );
// };
// export default SignUP;
