import React, { useEffect, useState } from 'react'
import { MobileIcon, NavMenu, Nav, NavbarContainer, NavItem, NavLinks, NavLogo, NavBtnLink, NavBtn } from './NavBarElements'
import {animateScroll as scroll} from 'react-scroll'


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
      window.addEventListener('scroll', changeNav);
  }, [])

  const toggleHome = () => {
    scroll.scrollToTop()
  }

  return (
      <>
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            <NavLogo to="/" onClick={toggleHome}>V A Law Offices</NavLogo>
            <MobileIcon>
              <FaBars onClick={toggle}/>
            </MobileIcon>
            <NavMenu>
            <NavItem>
              <NavLinks to="about"
              smooth={true} duration={500} spy={true} exact='true' offset={-80}
              >About</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="practice"
              smooth={true} duration={500} spy={true} exact='true' offset={-80}
              >Practice Area</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="services"
              smooth={true} duration={500} spy={true} exact='true' offset={-80}
              >Services</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="careers"
              smooth={true} duration={500} spy={true} exact='true' offset={-80}
              >Careers</NavLinks>
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
