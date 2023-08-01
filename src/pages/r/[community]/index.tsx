import { auth, firestore } from "@/src/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext, NextPage } from "next";
import React, { useEffect } from "react";
import { Community, communityState } from "@/src/atoms/communitiesAtom";
import Header from "@/src/components/Community/Header";
import CreatePostLink from "@/src/components/Community/CreatePostLink";
import Posts from "@/src/components/Post/Posts";
import { useRecoilState } from "recoil";
import About from "@/src/components/Community/About";
import safeJsonStringify from "safe-json-stringify";
import { useAuthState } from "react-firebase-hooks/auth";
import CommunityNotFound from "@/src/components/Community/CommunityNotFound";
import PageContentLayout from "@/src/components/Layout/PageContent";

interface CommunityPageProps {
  communityData: Community;
}

const CommunityPage: NextPage<CommunityPageProps> = ({ communityData }) => {
  const [user, loadingUser] = useAuthState(auth);

  const [communityStateValue, setCommunityStateValue] =
    useRecoilState(communityState);


  useEffect(() => {
    setCommunityStateValue((prev) => ({
      ...prev,
      currentCommunity: communityData,
    }));
  }, [communityData]);

  // Community was not found in the database
  if (!communityData) {
    return <CommunityNotFound />;
  }

  return (
    <>
      <Header communityData={communityData} />
      <PageContentLayout>
        {/* Left Content */}
        <>
          <CreatePostLink />
          <Posts
            communityData={communityData}
            userId={user?.uid}
            loadingUser={loadingUser}
          />
        </>
        {/* Right Content */}
        <>
          <About communityData={communityData} />
        </>
      </PageContentLayout>
    </>
  );
};

export default CommunityPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  console.log("GET SERVER SIDE PROPS RUNNING");

  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.community as string
    );
    const communityDoc = await getDoc(communityDocRef);
    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() }) // needed for dates
            )
          : "",
      },
    };
  } catch (error) {
    // Could create error page here
    console.log("getServerSideProps error - [community]", error);
  }
}
