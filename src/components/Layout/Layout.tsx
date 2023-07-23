import React from 'react';
import Navbar from '../Navbar/Navbar'; // Ensure the correct path here


// https://stackoverflow.com/questions/71948755/property-children-does-not-exist-on-type
type Props = {
    children: React.ReactNode
 }
 
 const Layout: React.FC<Props> = ({ children })  => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
