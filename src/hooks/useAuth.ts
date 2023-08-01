import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";
import nookies from "nookies";
import { User } from "firebase/auth";

// Custom hook for managing authentication
const useAuth = () => {
  // Get the user state and loading state from the Firebase authentication
  const [user] = useAuthState(auth);

  useEffect(() => {
    // When the user state changes
    console.log("HERE IS USER", user);

    // If user is authenticated, set the user token as a cookie
    // Otherwise, remove the token from cookies
    user ? setUserCookie(user) : nookies.set(undefined, "token", "");
  }, [user]);

  // Function to set the user token as a cookie using nookies
  const setUserCookie = async (user: User) => {
    // Retrieve the user token from Firebase
    const token = await user.getIdToken();
    console.log("HERE IS TOKEN", token);

    // Set the user token as a cookie with the name "token"
    nookies.set(undefined, "token", token);
  };
};

export default useAuth;
