import React from 'react'
interface mailObj {
    _id: string,
    recipient: string,
    sender: string,
    subject: string,
    body: string,
    createdDate: string,
    updatedDate: string,
}
interface inboxItemProps{
    data: mailObj
}


function InboxItem(props: inboxItemProps) {
    const emailDate: Date = new Date(props.data.createdDate);
    return (
        <li className='border border-1 d-flex'>
                <div className='d-flex flex-column '>
                    <span className='fw-bold '>{props.data.sender}</span>
                    <div><span className='fw-bold me-2 '>{props.data.subject}</span> {props.data.body} </div>
                </div>
                <div>{emailDate.toISOString()}</div>
        </li>
    )
}

export default InboxItem