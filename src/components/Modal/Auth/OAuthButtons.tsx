import { Button, Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/src/firebase/clientApp';
import { User } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

const OAuthButtons: React.FC = () => {
  // Initialize Google Sign-In hook
  const [signInWithGoogle, userCred, loading, error] = useSignInWithGoogle(auth);

  // Function to create a user document in Firestore
  const createUserDocument = async (user: User) => {
    try {
      const userDocRef = doc(firestore, 'users', user.uid);
      await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
    } catch (error) {
      console.error('Error creating user document:', error);
    }
  };

  // useEffect to create user document when userCred changes
  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

  return (
    <Flex direction='column' width='100%' mb={4}>
      {/* Google Sign-In Button */}
      <Button
        variant='oauth'
        mb={2}
        isLoading={loading}
        onClick={() => signInWithGoogle()}
      >
        <Image src='/images/googlelogo.png' height='20px' mr={4} />
        Continue with Google
      </Button>
      {/* Display error message if any */}
      {error && <Text>{error.message}</Text>}
    </Flex>
  );
};

export default OAuthButtons;
