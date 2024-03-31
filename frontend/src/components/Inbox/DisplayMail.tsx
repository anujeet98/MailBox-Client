import React, { EventHandler } from 'react'
import { Container, Button } from 'react-bootstrap';
import { deleteInboxMailThunk } from '../../store/inboxSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
type OnSelectBack = () => void;
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
interface displayMailProps{
    data: mailObj,
    onSelectBack: OnSelectBack,
}
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
function DisplayMail(props: displayMailProps) {
    const dispatch = useDispatch<any>();
    const token = useSelector((state: AuthState) => state.auth.token);
    function deleteMail(){
        if (window.confirm("Please confirm before proceeding to delete the email!")) {
            (async ()=>{
                try{
                    if(token){
                        await dispatch(deleteInboxMailThunk(token, props.data._id));
                        alert('Email deleted successfully');
                    }
                }
                catch(err: any){
                    console.log(err);
                    alert(`Error-${err?.response?.data?.message}`);
                }
            })()
        }
    }
  return (
    <Container fluid className='p-0 min-vh-100 mt-0 p-4'>
        <div className='border-bottom mb-3 pb-3'>
            <i className="ri-arrow-left-line btn m-0 p-0 fs-5 fw-bold" onClick={props.onSelectBack}></i>
            <Button className='btn btn-danger text-white float-end' onClick={deleteMail}>Delete</Button>
        </div>
        <div className='mb-2'>
            <span className='fw-bold'>From: </span><span>{props.data.sender}</span>
        </div>
        <div className='mb-2'>
            <span className='fw-bold'>To: </span><span>{props.data.recipient}</span>
        </div>
        <div className='mb-4'>
            <span className='fw-bold'>Subject: </span><span>{props.data.subject}</span>
        </div>
        <div className='bg-light'>
            <span>{props.data.body}</span>
        </div>
        
    </Container>
  )
}

export default DisplayMail