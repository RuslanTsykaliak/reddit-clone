// OPTION 1 NoSQL
// const COMMUNITY = {
//     id: "commId",
//     /**
//      * 
//     */
//    users: ['userId1', 'userId2', '.....', 'userId123456789'],
// };

// const USER = {
//     id: "userId1",
//     /**
//      * 
//     */
//    communities: ['commId2', 'commId2'],
// };


// OPTION 2 - SQL APPROACH
// const USER_COMMUNITY = {
//     userId: 'userId',
//     communityId: 'commId'
// }

// OPTION 3
// const USER = {
//     id: 'userId',
//     /**
//      * 
//     */
//    // subcollection
//    communitySnippets: [
//     {
//         communityId: 'commId1',
//     },
//     {
//         communityId: 'commId2',
//     },
//     /**
//      * 
//      */
//     {
//         communityId: 'commId10',
//     },
//    ],
// };

// const COMMUNITY = {
//     id: 'commId',
//     numberOfMembers: '1234567890728056857854353',
// };