import React from 'react'
import { Icon, CloseIcon, SidebarContainer, SideBtnWrap, SidebarMenu, SidebarWrapper, SidebarLink, SidebarRoute } from './SidebarElements'

export default function Sidebar({isOpen, toggle}) {
  return (
    <SidebarContainer isOpen = { isOpen } onClick={toggle}>
      <Icon>
        <CloseIcon onClick={toggle}/>
      </Icon>
      <SidebarWrapper onClick={toggle}>
        <SidebarMenu>
          <SidebarLink to='signup' onClick={toggle}>About</SidebarLink>
          <SidebarLink to='discover' onClick={toggle}>Discover</SidebarLink>
          <SidebarLink to='services' onClick={toggle}>Services</SidebarLink>
          <SidebarLink to='signup' onClick={toggle}>Sign Up</SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute to='/signin'>Sign In</SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  )
}
