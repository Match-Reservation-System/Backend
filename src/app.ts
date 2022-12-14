import express, { Request, Response } from 'express';
import 'dotenv/config';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server started on port 3000');
});
