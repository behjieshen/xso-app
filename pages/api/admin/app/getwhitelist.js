import { getSession } from 'next-auth/client'
import {getWhiteList} from '../../../../utils/whitelist'

export default async (req, res) => {
  const session = await getSession({ req })

  if (!session) res.status(401).end()
  else {
    
    let list = await getWhiteList(req.body.email)

    res.status(200).send()
  }
}