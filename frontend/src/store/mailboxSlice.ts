import { Dispatch, Slice, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosResponse } from "axios";
interface mailObj {
    _id: string,
    recipient: string,
    sender: string,
    subject: string,
    body: string,
    isRead: boolean,
    createdDate: string,
    updatedDate: string,
}
interface mailbox {
    inbox: Array<mailObj>,
    sentMails: Array<mailObj>,
}

interface mailboxResult{
    status: number,
    mails: Array<mailObj>,
}

const initialState = {inbox: new Array<mailObj>(), sentMails: new Array<mailObj>()}
const mailboxSlice: Slice<mailbox> = createSlice({
    name: 'mailbox',
    initialState,
    reducers:{
        updateMailStatusRead(state, action){
            const updatedMails = state.inbox.map(mail => {
                if(mail._id === action.payload)
                    return {...mail, isRead: true};
                return mail;
            });
            state.inbox = updatedMails;
        },
        setInbox(state, action){
            state.inbox = action.payload;
        },
        deleteInboxMail(state, action){
            const updatedMailList = state.inbox.filter(mail => mail._id !== action.payload);
            state.inbox = updatedMailList;
        },
        setSentMails(state, action){
            state.sentMails = action.payload;
        },
        deleteSentboxMail(state, action){
            const updatedMailList = state.sentMails.filter(mail => mail._id !== action.payload);
            state.sentMails = updatedMailList;
        }
    }

})

export const { updateMailStatusRead, setInbox, deleteInboxMail, setSentMails, deleteSentboxMail } = mailboxSlice.actions;
export default mailboxSlice.reducer;


export const readStatusUpdateThunk = (token: string, id: string) => {
    return async(dispatch: Dispatch<any>) => {
        try{
            await axios.patch(`http://localhost:4000/mail/inbox/${id}`, {}, {
                headers: {
                    Authorization: token
                }
            });
            dispatch(updateMailStatusRead(id));
        }
        catch(err){
            throw err;
        }
    }
}


export const getMailThunk = (token: string, mailboxType: string) => {
    return async(dispatch: Dispatch<any>) => {
        try{
            const res: AxiosResponse<mailboxResult> = await axios.get(`http://localhost:4000/mail/${mailboxType}`,{
                headers: {
                    Authorization: token
                }
            });
            if(mailboxType==='sent')
                dispatch(setInbox(res.data.mails));
            else
                dispatch(setSentMails(res.data.mails));
        }
        catch(err: any){
            throw err;
        }
    }
};


export const deleteMailboxThunk = (token: string, id: string, mailboxType: string) => {
    return async(dispatch: Dispatch<any>) => {
        try{
            const res: AxiosResponse<mailboxResult> = await axios.delete(`http://localhost:4000/mail/${mailboxType}/${id}`,{
                headers: {
                    Authorization: token
                }
            });
            if(mailboxType==='sent')
                dispatch(deleteSentboxMail(id));
            else
                dispatch(deleteInboxMail(id));
        }
        catch(err: any){
            throw err;
        }
    }
};

