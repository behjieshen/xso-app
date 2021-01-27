export default function handler(req, res) {
  const {
    query: { id },
  } = req;

  if (req.method === 'GET') {
    res.send(`You are user ${id}`);
  } else {
    res.send('404 error');
  }
}
