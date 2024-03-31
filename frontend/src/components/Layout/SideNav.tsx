import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function SideNav() {
  return (
    <Navbar className="p-0 m-0 bg-secondary-subtle mh-100 fs-5 d-flex flex-column pt-5 text-start" style={{width: '20rem'}}>
            <Navbar.Brand href="#home" className='m-0 p-0 mx-auto fs-3'>ZapMail</Navbar.Brand>
            <Nav className="d-flex flex-column align-items-center mt-3">
                <NavLink to={"/home/compose"} className='text-decoration-none link-dark '>Compose</NavLink>
                <NavLink to={"/home/inbox"} className='text-decoration-none link-dark' >Inbox</NavLink>
            </Nav>
    </Navbar>
  )
}

export default SideNav