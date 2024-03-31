import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
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
interface inboxState {
  inbox: {
      mails: Array<mailObj>
  }
}


function SideNav() {
  const mails = useSelector((state: inboxState) => state.inbox.mails);
  const unreadCount = mails.filter(mail => mail.isRead===false).length;
  return (
    <Navbar className="p-0 m-0 bg-secondary-subtle mh-100 fs-5 d-flex flex-column pt-5" style={{width: '20rem'}}>
            <Navbar.Brand href="#home" className='m-0 p-0 mx-auto fs-3'>ZapMail</Navbar.Brand>
            <Nav className="d-flex flex-column align-items-start mt-3 w-100 p-3">
                <NavLink to={"/home/compose"} className='text-decoration-none link-dark w-100'>Compose</NavLink>
                <NavLink to={"/home/inbox"} className='text-decoration-none link-dark d-flex align-items-baseline justify-content-between  w-100 ' ><span>Inbox</span> <span className=' fs-6 '>{unreadCount} Unread</span></NavLink>
            </Nav>
    </Navbar>
  )
}

export default SideNav