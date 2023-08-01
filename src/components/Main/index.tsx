import Link from "next/link";
import React from "react";

const Main: React.FC<{}> = () => {
  return (
    <div>
      Here is main
      <Link href="/r/notShadeesCommunity">hehe</Link>{" "}
      {/* Link component with the destination */}
    </div>
  );
};
export default Main;
