import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import dbConnect from "../../../utils/mongodb";
import User from "../../../models/User";

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    signIn: async (user, account, profile) => {
      const { name, email, image } = user;

      try {
        await dbConnect();
        console.log("------------------");
        let user = await User.findOne({ email }).exec();
        console.log(user);
        if (!user) {
          const newUser = new User({
            name,
            email,
            image,
          });
          await newUser.save();
        }

        return Promise.resolve(true);
      } catch (err) {
        console.log("Server error");
        console.log(err);
        throw new Error("Error in signin callback");
      }
    },

    session: async (session, user) => {
      try {
        await dbConnect();
        let dbUser = await User.findOne({ email: session.user.email }).exec();
        session.dbUser = dbUser;
        session.id = dbUser._id;
      } catch (err) {
        console.log("Server error");
        console.log(err);
        throw new Error("Error in session callback");
      }
      return Promise.resolve(session);
    },
  },

  // Enable debug messages in the console if you are having problems
  debug: true,
};

export default (req, res) => NextAuth(req, res, options);
