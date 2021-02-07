import React from 'react'
import styled, { css } from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { menuData } from '../data/MenuData'
import { Button } from './Button'


const Nav = styled.nav`
    height: 60px;
    display:flex;
    justify-content:space-between;
    padding:1rem 2rem;
    z-index:100;
    position: fixed;
    width:100%;
    background: red;
`

const NavLink = css`
    color:#fff;
    font-style:italic;
    display:flex;
    align-items:center;
    padding: 0 1rem;
    height:100%;
    cursor:pointer;
    text-decoration: none;
`

const Logo = styled(Link)`
${NavLink}
`

const MenuBars = styled.i`
    display:none;
`

const NavMenu = styled.div`
    display:flex;
    align-items:center;
    margin-right: -48px;

    @media screen and (max-width:768px){
        display:none;
    }
`

const NavMenuLinks = styled(Link)`
    ${NavLink}
`

const NavBtn = styled.div`
    display:flex;
    align-items:center;
    margin-right: 24px;

    @media screen and (max-width:768px){
        display:none;
    }
`

const Navbar = () => {
    return (
        <Nav>
            <Logo>Food Ninja's</Logo>
            <MenuBars />
            <NavMenu>
                {menuData.map((item, index) => (
                    <NavMenuLinks to={item.link} key={index}>
                        {item.title}
                    </NavMenuLinks>
                ))}
            </NavMenu>
            <NavBtn>
                <Button to="/contact" primary='true'>Contact Us</Button>
            </NavBtn>
        </Nav>
    )
}

export default Navbar
