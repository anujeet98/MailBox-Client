import { Request, Response } from "express";
import mailModel from "../models/mails";
import sentboxModel from "../models/sentbox";
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
        const respInbox = await mailModel.create({recipient: recipient, sender: sender, subject: subject, body: body});
        const respSentBox = await sentboxModel.create({recipient: recipient, sender: sender, subject: subject, body: body});
        res.status(200).json({status: 200, message: 'Email sent successfully'});
    }
    catch(err){
        console.log('SendMail-Error: ',err);
        res.status(500).json({error: err, message: "something went wrong while sending the email"});
    }
}


export const inbox = async(req: Request, res: Response) => {
    try{
        const { user } = req.body;

        const resp = await mailModel.find({recipient: user.email});
        res.status(200).json({status: 200, mails: resp});
    }
    catch(err){
        console.log('GetInbox-Error: ',err);
        res.status(500).json({error: err, message: "something went wrong while fetching the inbox"});
    }
}

export const sentbox = async(req: Request, res: Response) => {
    try{
        const { user } = req.body;

        const resp = await sentboxModel.find({recipient: user.email});
        res.status(200).json({status: 200, mails: resp});
    }
    catch(err){
        console.log('GetSentbox-Error: ',err);
        res.status(500).json({error: err, message: "something went wrong while fetching the sent mails"});
    }
}

export const updateReadStatus = async(req: Request, res: Response) => {
    try{
        const { user } = req.body;
        const mailId = req.params.id;

        const mail = await mailModel.findOne({_id: mailId});
        if(mail){
            mail.isRead = true;
            await mail.save();
        }
        res.status(200).json({status: 200, message: 'mail status updated to read'});
    }
    catch(err){
        console.log('updateReadStatus-Error: ',err);
        res.status(500).json({error: err, message: "something went wrong while updating the read status"});
    }
}

export const deleteInboxMail = async(req: Request, res: Response) => {
    try{
        const { user } = req.body;
        const mailId = req.params.id;

        const mail = await mailModel.findOne({_id: mailId});
        if(mail){
            mail.isRead = true;
            await mailModel.deleteOne({_id: mail._id});
        }
        res.status(200).json({status: 200, message: 'Mail deleted successfully'});
    }
    catch(err){
        console.log('updateReadStatus-Error: ',err);
        res.status(500).json({error: err, message: "something went wrong while updating the read status"});
    }
}

export const deleteSentboxMail = async(req: Request, res: Response) => {
    try{
        const { user } = req.body;
        const mailId = req.params.id;

        const mail = await mailModel.findOne({_id: mailId});
        if(mail){
            mail.isRead = true;
            await sentboxModel.deleteOne({_id: mail._id});
        }
        res.status(200).json({status: 200, message: 'Mail deleted successfully'});
    }
    catch(err){
        console.log('updateReadStatus-Error: ',err);
        res.status(500).json({error: err, message: "something went wrong while updating the read status"});
    }
}