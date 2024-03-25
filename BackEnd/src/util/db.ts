import { error } from "console";
import mongoose from "mongoose";


export class Database {
    public static async init(){
        try{
            const connURL: string | undefined = process.env.MONGODB_CONN_STR;
            if(connURL === undefined)
                throw new Error('Invalid MongoDB connection string');
            await mongoose.connect(connURL);
            console.info('connected to mongo server...');
        }
        catch(err){
            console.error(err);
            throw err;
        }
    }
}

export default mongoose;