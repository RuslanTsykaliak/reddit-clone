// import { Community } from '@/src/atoms/communitiesAtom';
// import { firestore } from '@/src/firebase/clientApp';
// import { doc, getDoc } from 'firebase/firestore';
// import { GetServerSidePropsContext } from 'next';
// import React from 'react';
// import safeJsonStingify from 'safe-json-stringify';

// type CommunityPageProps = {
//     communityData: Community;
// };


// // Server Error Error: Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?
// const CommunityPage:React.FC<CommunityPageProps> = ({ communityData }) => {
//     console.log('Here is data', communityData);

//     if (!communityData) {
//         return <div>Community does not exists</div>;
//     }
    
//     return <div>WELCOME TO {communityData.id}</div>;
// };

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//     // Get community data adn pass it to client
//     try {
//         const communityDocRef = doc(
//             firestore,
//             'communities',
//             context.query.communitiesId as string
//         );
//         const communityDoc = await getDoc(communityDocRef);

//         return {
//             props: {
//                 communityData: communityDoc.exists() ? JSON.parse(
//                     safeJsonStingify({ id: communityDoc.id, ...communityDoc.data() })) 
//                     : "",
//             },
//         };
//     } catch (error) {
//         // Could add error page here
//         console.log('getServerSideProps error', error);
//     }
// }

// export default CommunityPage;

// import { firestore } from "@/src/firebase/clientApp";
// import { collection, getDocs, doc, getDoc } from "firebase/firestore";
// import { GetServerSideProps, GetServerSidePropsContext } from "next";
// import React, { useEffect } from "react";
// import { Community, communityState } from "@/src/atoms/communitiesAtom";
// import NotFound from "@/src/components/Community/NotFound";
// import Header from "@/src/components/Community/Header";
// import PageContent from "@/src/components/Layout/PageContent";
// import CreatePostLink from "@/src/components/Community/CreatePostLink";
// import Posts from "@/src/components/Post/Posts";
// import { useSetRecoilState } from "recoil";
// import About from "@/src/components/Community/About";
// import safeJsonStringify from "safe-json-stringify";

// type CommunityPageProps = {
//   communityData: Community;
// };

// const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
//   console.log("here is data", communityData);
//   const setCommunityStateValue = useSetRecoilState(communityState);
//   if (!communityData) {
//     return <NotFound />; // Display the custom "Not Found" page
//   }

//   useEffect(() => {
//     setCommunityStateValue((prev) => ({
//       ...prev,
//       currentCommunity: communityData,
//     }));
//   }, []);

//   return (
//     <>
//       <Header communityData={communityData} />
//       <PageContent>
//         <>
//           <CreatePostLink />
//           <Posts communityData={communityData} />
//         </>
//         <>
//           <About communityData={communityData} />
//         </>
//       </PageContent>
//     </>
//   );
//   // return <div>WELCOME TO {communityData.id}</div>;
// };


// // Error: Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?
// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   try {
//     const communityDocRef = doc(
//       firestore,
//       "communities",
//       context.query.communityId as string
//     );
//     const communityDoc = await getDoc(communityDocRef);
//     return {
//       props: {
//         communityData: communityDoc.exists()
//           ? JSON.parse(
//               safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
//             )
//           : "",
//       },
//     };
//   } catch (error) {
//     console.log("getServerSideProps error", error);
//   }
// }

// export default CommunityPage;