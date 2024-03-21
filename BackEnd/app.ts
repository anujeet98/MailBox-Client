import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';

import authRoute from './routers/auth';

const app: express.Application = express();
const PORT: number = Number(process.env.PORT) | 4000;

app.use(cors());
app.use(express.json());


app.use('/auth', authRoute);


app.listen(PORT, ()=>{
    console.log(`server running on port :: ${PORT}`);
});