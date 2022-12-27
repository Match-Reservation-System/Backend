import express, { Request, Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
import router from './api/app.route';
import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if(process.env.ENV == 'dev') {
  app.use(morgan('dev'));
}


app.use('/api', router);

const port = process.env.LC_PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

//handle non existing routes
app.use((req: Request, res: Response) => {
  res.status(404).send('Not found');
});

export default app;
