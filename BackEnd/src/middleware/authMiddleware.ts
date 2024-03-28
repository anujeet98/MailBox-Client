import Cryptr from "cryptr";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Users from "../models/users";
const CRYPTR_SECRET: string = process.env.CRYPT_SECRET!;
const cryptr = new Cryptr(CRYPTR_SECRET as string);
interface authToken{
    email: string,
    expiresIn: string,
    id: string,
}

export const auth = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const token: string | undefined = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
          }
        const userData = jwt.verify(token as string, process.env.JWT_AUTH_SECRET as string) as authToken;
        const userId = cryptr.decrypt(userData.id);
        const verifiedUser = await Users.findById(userId);
        if(verifiedUser){
            req.body.user = verifiedUser;
            next();
        }
        else{
            return res.status(401).json({ error: 'User not found. \nPlease sign in again' });
        }
    }   
    catch(err: any){
        if(err && err.name === 'JsonWebTokenError')
            return res.status(401).json({ error: 'User unauthorized', message: 'User unauthorized. \nPlease sign-in again'});
        if(err && err.name === 'TokenExpiredError')
            return res.status(401).json({error: 'Token expired', message: 'Authentication token expired. \nPlease sign in again'});

        console.error('authenticationError: ', err);
        res.status(500).json({error: err, message: "something went wrong"});
    }
}