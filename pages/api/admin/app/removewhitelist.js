import { getSession } from 'next-auth/client'
import {removeWhiteList} from '../../../../utils/whitelist'

export default async (req, res) => {
  const session = await getSession({ req })

  if (!session & req.body.email) res.status(401).end()
  else {
    
    let removed = await removeWhiteList(req.body.email)

    res.status(200).send()
  }
}