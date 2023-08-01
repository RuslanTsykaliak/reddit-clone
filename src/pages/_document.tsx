import { Html, Head, Main, NextScript } from "next/document";

// Custom Document component to modify the initial HTML document served to the client.
export default function Document() {
  return (
    <Html>
      {/* Preconnect to Google Fonts service for improved performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />

      {/* Include "Open Sans" font from Google Fonts using an external CSS file */}
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap"
        rel="stylesheet"
      />
      <Head />

      <body>
        <Main />
        {/* Includes necessary JavaScript files and scripts for the application */}
        <NextScript />
      </body>
    </Html>
  );
}
