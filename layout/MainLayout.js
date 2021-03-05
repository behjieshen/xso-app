import Sidebar from "../components/Sidebar";
import { useSession } from "next-auth/client";
import Router from "next/router";
import MobileSideBar from "../components/MobileSideBar";
import { useState } from "react";

export default function MainLayout({ children }) {
  const [session, loading] = useSession();
  const [sideBarVisible, setSideBarVisible] = useState(true);

  if (!session && !loading) {
    Router.push(process.env.NEXTAUTH_URL + "login");
  }

  return (
    <>
      {session && (
        <div className="min-h-screen flex bg-white">
          {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
          <MobileSideBar
            image={session.user.image}
            name={session.user.name}
            sideBarVisible={sideBarVisible}
            setSideBarVisible={setSideBarVisible}
          />
          {/* <!-- Static sidebar for desktop --> */}
          <Sidebar
            image={session.user.image}
            name={session.user.name}
            sideBarVisible={sideBarVisible}
            setSideBarVisible={setSideBarVisible}
          />
          {React.cloneElement(children, { setSideBarVisible })}
          {/* {children} */}
        </div>
      )}
    </>
  );
}
