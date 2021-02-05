import Sidebar from "../components/Sidebar";
import { useSession } from "next-auth/client";
import Router from "next/router";
import MobileSideBar from "../components/MobileSideBar";

export default function MainLayout({ children }) {
  const [session, loading] = useSession();

  if (!session && !loading) {
    Router.push(process.env.NEXTAUTH_URL + "login");
  }

  return (
    <>
      {session && (
        <div className="min-h-screen flex bg-white">
          {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
          <MobileSideBar />
          {/* <!-- Static sidebar for desktop --> */}
          <Sidebar image={session.user.image} name={session.user.name} />
          {children}
        </div>
      )}
    </>
  );
}
