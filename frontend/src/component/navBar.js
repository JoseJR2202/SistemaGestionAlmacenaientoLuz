import React from 'react'
import {
    Routes,
    Route,
} from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import Investigation from '../pages/investigation/investigation';
import Login from '../pages/user/login';
import Home from '../pages/home';
import Profile from '../pages/user/profile';
import Meetings from '../pages/meetings/meetings';
import Error from '../pages/error404';
import {ReactComponent as ReactLogo} from '../img/logo.svg';

import { Navbar, Container, Nav } from 'react-bootstrap';

const navBar = () => {

    return (
    <div>
        <Navbar bg="light" expand="lg" >
            <Container>
                <Navbar.Brand href="/"><ReactLogo/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/reuniones">Reuniones</Nav.Link>
                    <Nav.Link href="/investigaciones">Investigaciones</Nav.Link>
                    <Nav.Link href="/perfil">perfil <FaUserCircle size="25"/></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Home />}/>
            <Route path="/reuniones" element={<Meetings />}/>
            <Route path="/investigaciones" element={<Investigation />}/>
            <Route path="/perfil" element={<Profile />}/>
            <Route path="*" element={<Error/>}/>
        </Routes>
    </div>
  )
}

export default navBar