import { Request, Response, NextFunction } from 'express';

const signup = (req: Request, res: Response) => {
    try{
        // const {email:string, password:string} = req.body;
        // console.log(email, password);   
        res.status(200).json({message: 'success'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'SIGN-UP-ERROR', message: 'something went wrong during signup'});
    }
}

const signin = (req: Request, res: Response) => {
    try{
        throw new Error('test');
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'SIGN-UP-ERROR', message: 'something went wrong during signup'});
    }
}


const auth = (req: Request, res: Response) => {
    try{
        throw new Error('test');
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'SIGN-UP-ERROR', message: 'something went wrong during signup'});
    }
}


export default {
    signup,
    signin,
    auth
}
