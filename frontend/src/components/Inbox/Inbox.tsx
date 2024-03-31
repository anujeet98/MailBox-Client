import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import InboxItem from './InboxItem';
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


function Inbox() {
    const [mails, setMails] = useState<null | Array<mailObj>>(null);
    const token = useSelector((state: AuthState) => state.auth.token);
    useEffect(()=>{
        const getInbox = async() => {
            try{
                const res: AxiosResponse<inboxResult> = await axios.get('http://localhost:4000/mail/inbox',{
                    headers: {
                        'Authorization': token
                    }
                });
                setMails(res.data.mails);
            }
            catch(err: any){
                alert(`Error-${err.response.data.message}`);
            }
        };
        getInbox();
    },[]);

    if(mails===null)
        return (
            <Container fluid className='d-flex p-0 min-vh-100 d-flex align-items-center justify-content-center '>
                LOADING...
            </Container>
        );

    return (
        <Container fluid className='d-flex p-0 min-vh-100 mt-3'>
            <ul className='list-unstyled w-100 '>
                {
                    mails.map(mail => <InboxItem data={mail}/>)}
            </ul>
        </Container>
    )
}

export default Inbox