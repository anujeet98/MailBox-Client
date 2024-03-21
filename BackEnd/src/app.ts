import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { Database } from './util/db';
import authRoute from './routers/auth';

const app: express.Application = express();
const PORT: number = Number(process.env.PORT) | 4000;

app.use(cors());
app.use(express.json());


app.use('/auth', authRoute);


const startServer = async () => {
    try {
        await Database.init();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1); 
    }
};
startServer();