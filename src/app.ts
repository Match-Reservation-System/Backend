import express, { Request, Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
import client from './config/db/db';
import router from './api/app.route';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);
app.get('/',async (req: Request, res: Response) => {
 try{
  const conn = await client.connect();
  const result = await conn.query('SELECT * FROM test');
  conn.release();
  res.status(200).json(result.rows);
 }catch(err: unknown){
    const typedError = err as Error;
    console.log(typedError?.message);
 }
});

const port = process.env.LC_PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

//handle non existing routes
app.use((req: Request, res: Response) => {
  res.status(404).send('Not found');
});

export default app;
