import React from 'react'
import { MobileIcon, NavMenu, Nav, NavbarContainer, NavItem, NavLinks, NavLogo, NavBtnLink, NavBtn } from './NavBarElements'

import { FaBars } from 'react-icons/fa'

export default function Navbar({ toggle }) {
  return (
      <>
        <Nav>
          <NavbarContainer>
            <NavLogo to="/">dolla</NavLogo>
            <MobileIcon>
              <FaBars onClick={toggle}/>

            </MobileIcon>
            <NavMenu>
            <NavItem>
              <NavLinks to="about">About</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="discover">Discover</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="services">Services</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="signup">Sign Up</NavLinks>
            </NavItem>
            </NavMenu>
            <NavBtn>
              <NavBtnLink to='signin'>Sign In</NavBtnLink>
            </NavBtn>
          </NavbarContainer>
        </Nav>
      </>
  )
}
