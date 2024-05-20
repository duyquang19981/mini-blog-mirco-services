import express from 'express';

import { randomBytes } from 'crypto';
import bodyParser from 'body-parser';

const app = express();
const port = 4000;

app.use(bodyParser.json());
type Post = { id: string; title: string };

let posts: { [key: string]: Post } = {};

app.get('/posts', (req: express.Request, res: express.Response) => {
  res.send(posts);
});

app.post('/posts', (req: express.Request<string, Post>, res: express.Response) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = { id, title };

  res.status(201).send(posts[id]);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
