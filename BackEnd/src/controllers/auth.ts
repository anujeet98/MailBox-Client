import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import userModel from '../models/users';
import inputValidator from '../util/input-validator';
import Cryptr from 'cryptr';
import Users from '../models/users';
const SECRET: Secret | undefined = process.env.JWT_AUTH_SECRET;
const CRYPTR_SECRET: string = process.env.CRYPT_SECRET!;
const cryptr = new Cryptr(CRYPTR_SECRET as string);

interface authToken{
    email: string,
    expiresIn: string,
    id: string,
}

const signup = async(req: Request, res: Response) => {
    try{
        const {email, password} = req.body; 
        //validation
        if(!inputValidator.email(email))
            return res.status(422).json({error: 'INVALID-EMAIL', message: 'Invalid email-id received'});
        if(!inputValidator.password(password))
            return res.status(422).json({error: 'INVALID-PASSWORD', message: 'Invalid password received. Password must be atleast 6 characters long'});
        
        let existingUser = await userModel.findOne({email: email});
        if(existingUser){
            return res.status(400).json({error: 'EMAIL_EXISTS', message: 'Email id used for sign-up already exists'});
        }

        const hashedPassword: string = await bcrypt.hash(password, 10);
        const newUser = new userModel({email: email, password: hashedPassword});
        const response = await newUser.save();

        const expirationTimeInSeconds = 3600;
        const tokenExpiry = Math.floor(Date.now() / 1000) + expirationTimeInSeconds;
        if(!SECRET)
            throw new Error('Undefined JWT secret');
        const encryptId = cryptr.encrypt(response._id.toString());
        res.status(200).json({ email: email, expiresIn: tokenExpiry, idToken: jwt.sign({email: email, expiresIn: tokenExpiry, id: encryptId}, SECRET) });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: 'SIGN-UP-ERROR', message: 'Something went wrong during signup'});
    }
}

const signin = async(req: Request, res: Response) => {
    try{
        const {email, password} = req.body;
        //validation
        if(!inputValidator.email(email))
            return res.status(422).json({error: 'INVALID-EMAIL', message: 'Invalid email-id received'});
        if(!inputValidator.password(password))
            return res.status(422).json({error: 'INVALID-PASSWORD', message: 'Invalid password received. Password must be atleast 6 characters long'});
        

        const user = await userModel.findOne({email: email});
        if(user){
            const passwordMatch = await bcrypt.compare(password, user.password.toString());
            if(passwordMatch){
                const expirationTimeInSeconds = 3600;
                const tokenExpiry = Math.floor(Date.now() / 1000) + expirationTimeInSeconds;
                if(!SECRET)
                    throw new Error('undefined JWT secret');
                const encryptId = cryptr.encrypt(user._id.toString());
                return res.status(201).json({ email: email, expiresIn: tokenExpiry, idToken: jwt.sign({email: email, expiresIn: tokenExpiry, id: encryptId}, SECRET) });
            }
            return res.status(401).json({error: 'INCORRECT-PASSWORD', message: 'Incorrect user password'});
        }

        res.status(404).json({error: 'USER-NOT-FOUND', message: `User doesn't exists for this email-id`});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: 'SIGN-UP-ERROR', message: 'Something went wrong during signup'});
    }
}


const auth = async(req: Request, res: Response) => {
    try{
        const token: string | undefined = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }
        const userData = jwt.verify(token as string, process.env.JWT_AUTH_SECRET as string) as authToken;
        const userId = cryptr.decrypt(userData.id);
        const verifiedUser = await Users.findById(userId);
        if(verifiedUser){
            const expirationTimeInSeconds = 3600;
            const tokenExpiry = Math.floor(Date.now() / 1000) + expirationTimeInSeconds;
            if(!SECRET)
                throw new Error('undefined JWT secret');
            const encryptId = cryptr.encrypt(verifiedUser._id.toString());
            return res.status(201).json({ email: verifiedUser.email, expiresIn: tokenExpiry, idToken: jwt.sign({email: verifiedUser.email, expiresIn: tokenExpiry, id: encryptId}, SECRET) });
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


export default {
    signup,
    signin,
    auth
}
