import React from 'react'
import {
    Routes,
    Route,
    Link
} from "react-router-dom";
import Investigation from '../pages/investigation/investigation';
import Login from '../pages/user/login';
import Home from '../pages/home';
import Profile from '../pages/user/profile';
import Meetings from '../pages/meetings/meetings';
import Error from '../pages/error404';
import { 
    Navbar,
    NavItem,
    NavbarBrand,
    NavLink,
    UncontrolledDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    NavbarText,
    NavbarToggler,
    Collapse,
    Nav
  } from 'reactstrap';


const navBar = () => {
  return (
    <div>
        <Navbar
            color="light"
            expand="md"
            light
        >
        <NavbarBrand href="/">
            Logo
        </NavbarBrand>
        <NavbarToggler onClick={function noRefCheck(){}} />
        <Collapse navbar > 
        <Nav
            className="ms-auto"
            navbar
        >
        <NavItem>
            <NavLink href="/login">
                Login
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="/">
                Home
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="/reuniones">
                reuniones
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="/investigaciones">
                investigaciones
            </NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="/perfil">
                perfil
            </NavLink>
        </NavItem>
      </Nav>
    </Collapse>
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