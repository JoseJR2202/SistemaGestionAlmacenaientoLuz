import React from 'react'
import { FaUserCircle } from 'react-icons/fa';
import {ReactComponent as ReactLogo} from '../img/logo.svg';

import { Navbar, Container, Nav } from 'react-bootstrap';

const navBar = () => {

    return (
    <div>
        <Navbar bg="light" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand href="/"><ReactLogo/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/reuniones">Reuniones</Nav.Link>
                    <Nav.Link href="/investigaciones">Investigaciones</Nav.Link>
                    <Nav.Link href="/perfil">perfil <FaUserCircle size="25"/></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default navBar