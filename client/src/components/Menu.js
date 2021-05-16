import React, { useContext, useState } from 'react';
import {AuthContext} from '../context/AuthContext'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export const Menu = props => {

  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);
  const auth = useContext(AuthContext)

  const logoutHandler = () => {
    auth.logout()
  }
  return (
    <div className='menu'>
      <Navbar color="primary" dark>
        <NavbarBrand href="/">{props.userId && 'Привет, ' + props.userId.slice(0, props.userId.indexOf('@')) + '!'}</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink onClick={() => alert('Эта кнопка пока не работает')}>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => alert('Эта кнопка пока не работает')}>History</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => alert('Эта кнопка пока не работает')}>Dark Mode</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => alert('Эта кнопка пока не работает')}>Support</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={logoutHandler}>Log out</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

