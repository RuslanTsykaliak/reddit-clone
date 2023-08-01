import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore, storage } from "@/src/firebase/clientApp";
import { Community, communityState } from "@/src/atoms/communitiesAtom";
import moment from "moment";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { FaReddit } from "react-icons/fa";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

// Define the props for the About component
type AboutProps = {
  communityData: Community;
  pt?: number;
  onCreatePage?: boolean;
  loading?: boolean;
};

// The About component
const About: React.FC<AboutProps> = ({
  communityData,
  pt,
  onCreatePage,
  loading,
}) => {
  // Get the authenticated user using React Firebase Hooks
  const [user] = useAuthState(auth); // will revisit how 'auth' state is passed
  // const router = useRouter();
  const selectFileRef = useRef<HTMLInputElement>(null);
  const setCommunityStateValue = useSetRecoilState(communityState);

  // April 24 - moved this logic to a custom hook in the tutorial build (useSelectFile)
  const [selectedFile, setSelectedFile] = useState<string>();

  // Added last!
  const [imageLoading, setImageLoading] = useState(false);

  // Handle image selection
  const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

  // Update the community image
  const updateImage = async () => {
    if (!selectedFile) return;
    setImageLoading(true);
    try {
      const imageRef = ref(storage, `communities/${communityData.id}/image`);
      await uploadString(imageRef, selectedFile, "data_url"); // need old version npm install firebase@9.11.0
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(firestore, "communities", communityData.id), {
        imageURL: downloadURL,
      });
      console.log("HERE IS DOWNLOAD URL", downloadURL);

      // April 24 - Update the Recoil state with the new community image URL
      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          imageURL: downloadURL,
        } as Community, // without Community give warning
      }));      
    } catch (error: any) {
      console.log("updateImage error", error.message);
    }

    setImageLoading(false);
  };

  return (
    <Box pt={pt} position="sticky" top="14px">
      <Flex
        justify="space-between"
        align="center"
        p={3}
        color="white"
        bg="blue.400"
        borderRadius="4px 4px 0px 0px"
      >
        <Text fontSize="10pt" fontWeight={700}>
          About Community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} cursor="pointer" />
      </Flex>
      <Flex direction="column" p={3} bg="white" borderRadius="0px 0px 4px 4px">
        {loading ? (
          <Stack mt={2}>
            <SkeletonCircle size="10" />
            <Skeleton height="10px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : (
          <>
            {/* Show the "Add description" box for the community creator */}
            {user?.uid === communityData?.creatorId && (
              <Box
                bg="gray.100"
                width="100%"
                p={2}
                borderRadius={4}
                border="1px solid"
                borderColor="gray.300"
                cursor="pointer"
              >
                <Text fontSize="9pt" fontWeight={700} color="blue.500">
                  Add description
                </Text>
              </Box>
            )}
            <Stack spacing={2}>
              <Flex width="100%" p={2} fontWeight={600} fontSize="10pt">
                <Flex direction="column" flexGrow={1}>
                  <Text>
                    {communityData?.numberOfMembers?.toLocaleString()}
                  </Text>
                  <Text>Members</Text>
                </Flex>
                <Flex direction="column" flexGrow={1}>
                  <Text>1</Text>
                  <Text>Online</Text>
                </Flex>
              </Flex>
              <Divider />
              <Flex
                align="center"
                width="100%"
                p={1}
                fontWeight={500}
                fontSize="10pt"
              >
                <Icon as={RiCakeLine} mr={2} fontSize={18} />
                {/* Show the creation date of the community */}
                {communityData?.createdAt && (
                  <Text>
                    Created{" "}
                    {moment(
                      new Date(communityData.createdAt!.seconds * 1000)
                    ).format("MMM DD, YYYY")}
                  </Text>
                )}
              </Flex>
              {/* Show "Create Post" button if not on the create page */}
              {!onCreatePage && ( // Or router.query.community
                <Link href={`/r/${communityData.id}/submit`}> 
                  <Button mt={3} height="30px">
                    Create Post
                  </Button>
                </Link>
              )}
              {/* Show admin section for the community creator */}
              {user?.uid === communityData?.creatorId && (
                <>
                  <Divider />
                  <Stack fontSize="10pt" spacing={1}>
                    <Text fontWeight={600}>Admin</Text>
                    <Flex align="center" justify="space-between">
                      <Text
                        color="blue.500"
                        cursor="pointer"
                        _hover={{ textDecoration: "underline" }}
                        onClick={() => selectFileRef.current?.click()}
                      >
                        Change Image
                      </Text>
                      {/* Show the community image */}
                      {communityData?.imageURL || selectedFile ? (
                        <Image
                          borderRadius="full"
                          boxSize="40px"
                          src={selectedFile || communityData?.imageURL}
                          alt="Dan Abramov"
                        />
                      ) : (
                        <Icon
                          as={FaReddit}
                          fontSize={40}
                          color="brand.100"
                          mr={2}
                        />
                      )}
                    </Flex>
                    {/* Show "Save Changes" button if a new image is selected */}
                    {selectedFile &&
                      (imageLoading ? (
                        <Spinner />
                      ) : (
                        <Text cursor="pointer" onClick={updateImage}>
                          Save Changes
                        </Text>
                      ))}
                    {/* Input to select an image */}
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/x-png,image/gif,image/jpeg"
                      hidden
                      ref={selectFileRef}
                      onChange={onSelectImage}
                    />
                  </Stack>
                </>
              )}
            </Stack>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default About;
