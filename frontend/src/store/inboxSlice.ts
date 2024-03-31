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
interface inbox {
    mails: Array<mailObj>
}

interface inboxResult{
    status: number,
    mails: Array<mailObj>
}

const initialState = {mails: new Array<mailObj>()}
const inboxSlice: Slice<inbox> = createSlice({
    name: 'inbox',
    initialState,
    reducers:{
        updateMailStatusRead(state, action){
            const updatedMails = state.mails.map(mail => {
                if(mail._id === action.payload)
                    return {...mail, isRead: true};
                return mail;
            });
            state.mails = updatedMails;
        },
        setInbox(state, action){
            state.mails = action.payload;
        },
        deleteInboxMail(state, action){
            const updatedMailList = state.mails.filter(mail => mail._id !== action.payload);
            state.mails = updatedMailList;
        }
    }

})

export const { updateMailStatusRead, setInbox, deleteInboxMail } = inboxSlice.actions;
export default inboxSlice.reducer;


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


export const getInboxThunk = (token: string) => {
    return async(dispatch: Dispatch<any>) => {
        try{
            const res: AxiosResponse<inboxResult> = await axios.get(`http://localhost:4000/mail/inbox`,{
                headers: {
                    Authorization: token
                }
            });
            dispatch(setInbox(res.data.mails));
        }
        catch(err: any){
            throw err;
        }
    }
};


export const deleteInboxMailThunk = (token: string, id: string) => {
    return async(dispatch: Dispatch<any>) => {
        try{
            const res: AxiosResponse<inboxResult> = await axios.delete(`http://localhost:4000/mail/inbox/${id}`,{
                headers: {
                    Authorization: token
                }
            });
            dispatch(deleteInboxMail(id));
        }
        catch(err: any){
            throw err;
        }
    }
};