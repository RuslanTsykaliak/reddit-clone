import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { theme } from "../chakra/theme";
import Layout from "../components/Layout";
import "../firebase/clientApp";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot> {/* Initialize Recoil state management */}
      <ChakraProvider theme={theme}> {/* Initialize Chakra UI theme */}
        <Layout> {/* Render the main layout */}
          <Component {...pageProps} /> {/* Render the current page */}
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;



// import "../styles/globals.css";
// import type { AppProps } from "next/app";
// import { ChakraProvider } from "@chakra-ui/react";
// import { theme } from "../chakra/theme";
// import Layout from "../components/Layout/Layout";
// import { RecoilRoot } from "recoil";

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <RecoilRoot>
//       <ChakraProvider theme={theme}>
//         <Layout>
//           <Component {...pageProps} />
//         </Layout>
//       </ChakraProvider>
//     </RecoilRoot>
//   );
// }
