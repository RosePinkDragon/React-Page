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
          <SidebarLink to='about' onClick={toggle}>About</SidebarLink>
          <SidebarLink to='practice' onClick={toggle}>Discover</SidebarLink>
          <SidebarLink to='services' onClick={toggle}>Services</SidebarLink>
          <SidebarLink to='careers' onClick={toggle}>Careers</SidebarLink>
        </SidebarMenu>
        <SideBtnWrap>
          <SidebarRoute to='/signin'>Request Appointment</SidebarRoute>
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  )
}
