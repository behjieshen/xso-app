import nc from "next-connect";
const handler = nc();
import { getSession } from "next-auth/client";
import { getWhiteList } from "../../../../utils/whitelist";
import { addWhiteList } from "../../../../utils/whitelist";
import Application from "../../../../models/Application";
import mongoose from 'mongoose';
import dbConnect from "../../../../utils/mongodb";

//GET list of students in the white list
handler.get(async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(500).json({ error: "Not Authenticated" });
  }
  
  try {
    const options = {
      page: req.query.page || 1,
      limit: 10,
      lean: true,
      sort: 'createdAt',
      collation: {
        locale: 'en',
      },
    };

    let list = await Application.paginate( { status: "ACCEPTED", whitelist: true }, options);

    let paginationData = {...list};
    delete paginationData.docs;


    return res.status(200).send({data: list.docs, paginationData });
  } 
  catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }  
    
});

//Remove a user from whitelist
handler.delete(async (req, res) => {
  const session = await getSession({ req });

  if (!session & req.body.email) res.status(401).end();
  else {
    let removed = await removeWhiteList(req.body.email);

    res.status(200).send();
  }
});


async function asyncForEach(array, callback) {
  await Promise.all(array.map((a, index) => callback(a, index, array)));
}

//Add all accepted users to whitelist
handler.put(async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(500).json({ error: "Not Authenticated" });
  }

  const dbSession = await mongoose.startSession();

  try { 
    await dbSession.startTransaction();

    let apps = await Application.find(
      { status: "ACCEPTED", whitelist: false }
    ).exec();

    await asyncForEach(apps, async (item) => {
      await Application.findOneAndUpdate({_id: item._id}, {whitelist: true}).session(dbSession)
      await addWhiteList(item.email)
    });

    // Complete transaction
    await dbSession.commitTransaction();
    dbSession.endSession();

    return res.status(200).json(apps);
  }catch(err){
    await dbSession.abortTransaction();
    dbSession.endSession();
    console.log(err);

    return res.status(400).send("An error has occured");
  }

  

});

export default handler;
