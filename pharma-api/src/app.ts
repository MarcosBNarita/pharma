import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import PatientRoute from './routes/Patient';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (request, response) =>
  response.json({
    message: 'REST Fullstack Challenge 20201209 Running',
  }),
);

app.use('/patients', PatientRoute);

export default app;
