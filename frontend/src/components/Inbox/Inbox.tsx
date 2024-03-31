import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import InboxItem from './InboxItem';
import DisplayMail from './DisplayMail';
import { useDispatch } from 'react-redux';
import { getInboxThunk } from '../../store/inboxSlice';
interface AuthRes {
    email: string,
    idToken: string,
    expiresIn: string,
}
interface AuthState {
    auth: {
        isLoggedIn: boolean,
        userData: null | AuthRes,
        token: string | null,
    }
}
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
interface inboxResult{
    status: number,
    mails: Array<mailObj>
}
interface inboxState {
    inbox: {
        mails: Array<mailObj>
    }
  }


function Inbox() {
    const mails = useSelector((state: inboxState) => state.inbox.mails)
    // const [mails, setMails] = useState<null | Array<mailObj>>(null);
    const [showMail, setShowMail] = useState<boolean>(false);
    const token = useSelector((state: AuthState) => state.auth.token);
    const [displayMail_ID, setDisplayMail_ID] = useState<null | string>(null); 
    const dispatch = useDispatch<any>();
    function selectMailToDisplay(id: string){
        setDisplayMail_ID(id);
        setShowMail(true);
    }

    useEffect(()=>{
        (async()=>{
            try{
                if(token){
                    await dispatch(getInboxThunk(token));
                }
            }
            catch(err: any){
                console.log(err);
                alert(`Error-${err?.response?.data?.message}`);
            }
        })();
    },[]);

    if(mails===null)
        return (
            <Container fluid className='d-flex p-0 min-vh-100 d-flex align-items-center justify-content-center '>
                LOADING...
            </Container>
        );
    
    if(showMail){
        const mailParams = mails.find(mail=>mail._id === displayMail_ID);
        if(mailParams)
            return <DisplayMail data={mailParams} onSelectBack={()=>{
                setDisplayMail_ID(null);
                setShowMail(false);
            }}/>
    }

    return (
        <Container fluid className='d-flex p-0 min-vh-100 mt-3'>
            <ul className='list-unstyled w-100 '>
                {
                    mails.map(mail => <InboxItem key={mail._id} data={mail} onSelectMail={()=>selectMailToDisplay(mail._id)}/>)
                }
            </ul>
        </Container>
    )
}

export default Inbox