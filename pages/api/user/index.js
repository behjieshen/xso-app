import { getSession } from "next-auth/client";
import User from "../../../models/User";
import dbConnect from "../../../utils/mongodb";
import nc from "next-connect";
const handler = nc();

// @route    GET api/users
// @desc     Get current user
// @access   Private
handler.get(async (req, res) => {
  await dbConnect();
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send("unauthenticated");
  }

  try {
    const user = await User.findById(session.id); //req.user has been set in middleware
    return res.json(user);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error");
  }
});

export default handler;
