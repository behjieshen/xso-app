import AppDetail from "../components/student/AppDetail";
import MainLayout from "../layout/MainLayout";
import dbConnect from "../utils/mongodb";
import Application from "../models/Application";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
export default function Review({ app }) {
  const router = useRouter();

  //user cannot access this route if they have not submitted an application
  if (app == null) {
    router.push("/");
  }

  return <AppDetail data={app} />;
}

Review.Layout = MainLayout;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  await dbConnect();
  let app;
  try {
    app = await Application.findOne({ user: session.dbUser._id }).then((res) => {
      if (res !== null && typeof res !== "undefined") {
        return JSON.parse(JSON.stringify(res));
      } else {
        return null;
      }
    });
  } catch (err) {
    console.log("user has not submitted an application");
    app = null;
  }
  return {
    props: { app }, // will be passed to the page component as props
  };
}
