import React, { EventHandler } from 'react'
import { Container } from 'react-bootstrap';
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
function DisplayMail(props: displayMailProps) {
  return (
    <Container fluid className='p-0 min-vh-100 mt-2 p-4'>
        <div className='border-bottom mb-3'><i className="ri-arrow-left-line btn m-0 p-0 fs-5 fw-bold" onClick={props.onSelectBack}></i></div>
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