import { Request, Response } from "express";
import mailModel from "../models/mails";
import { Types } from "mongoose";
// interface mailReqBodyObj{
//     recipient: string,
//     sender: string,
//     subject: string,
//     body: string,
//     user: Document<User>
// }


export const send = async(req: Request, res: Response) => {
    try{
        const { recipient, sender, subject, body, user } = req.body;
        if(recipient.trim()==='' || !/\S+@\S+\.\S+/.test(recipient))
            return   res.status(422).json({error: 'INVALID-EMAIL', message: 'Invalid recipient email received'});
        if(recipient===sender || recipient===user.email)
            return res.status(422).json({error: 'INVALID-RECIPIENT-ADDRESS', message: 'User\'s email id can\'t be used as Recipient '});
        if(subject.trim()==='')
            return res.status(422).json({error: 'INVALID-SUBJECT', message: 'Subject can\'t be empty'});
        const resp = await mailModel.create({recipient: recipient, sender: sender, subject: subject, body: body});
        res.status(200).json({status: 200, message: 'Email sent successfully'});
    }
    catch(err){
        console.log('SendMail-Error: ',err);
        res.status(500).json({error: err, message: "something went wrong"})
    }
}
