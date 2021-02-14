import React, { useEffect, useState } from 'react'
import { MobileIcon, NavMenu, Nav, NavbarContainer, NavItem, NavLinks, NavLogo, NavBtnLink, NavBtn } from './NavBarElements'



import { FaBars } from 'react-icons/fa'

export default function Navbar({ toggle }) {

  const [ scrollNav, setScrollNav ] = useState(false)

  const changeNav = () => {
    if(window.scrollY >= 80){
      setScrollNav(true)
    } else {
      setScrollNav(false)
    }
  }

  useEffect(() => {
      window.addEventListener('scroll', changeNav)
  }, [])

  return (
      <>
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            <NavLogo to="/">V A Law Offices</NavLogo>
            <MobileIcon>
              <FaBars onClick={toggle}/>
            </MobileIcon>
            <NavMenu>
            <NavItem>
              <NavLinks to="about">About</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="practice">Practice Area</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="services">Services</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="careers">Careers</NavLinks>
            </NavItem>
            </NavMenu>
            <NavBtn>
              <NavBtnLink to='booking'>Request Appointment</NavBtnLink>
            </NavBtn>
          </NavbarContainer>
        </Nav>
      </>
  )
}
