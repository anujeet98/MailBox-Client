import React from 'react'
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
interface inboxItemProps{
    data: mailObj
}


function InboxItem(props: inboxItemProps) {
    const emailDate: Date = new Date(props.data.createdDate);
    const isRead: boolean = props.data.isRead;

    const showMail = () => {
        
    }


    return (
        <li className='border border-1 d-flex p-2 btn btn-light' onClick={showMail}>
                <div id="readStatus" className='me-1'><i className={`ri-circle-fill ${isRead ? 'text-light' : 'text-success '} border rounded-5 border-3 `}></i></div>
                <div className='d-flex flex-column '>
                    <span className='fw-bold '>{props.data.sender}</span>
                    <div className='overflow-hidden '><span className='fw-bold me-2 '>{props.data.subject}</span> {props.data.body} </div>
                </div>
                <div>{emailDate.toISOString()}</div>
        </li>
    )
}

export default InboxItem