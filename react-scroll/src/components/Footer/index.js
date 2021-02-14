import React from 'react'

import { FaFacebook, FaInstagram, FaWhatsapp, FaTwitter } from 'react-icons/fa' 

import { FooterContainer, FooterLinkItems, FooterLinksContainer, FooterLinksWrapper, FooterLinkTitle, FooterWrap, FooterLink, SocialMediaWrap, SocialMedia, SocialLogo, SocialIcons, WebsiteRights, SocialIconLink } from './FooterElements'



export default function Footer() {
  return (
    <FooterContainer>
      <FooterWrap>
        <FooterLinksContainer>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>About Us</FooterLinkTitle> 
                <FooterLink to='/signin'>Sign In</FooterLink>
                <FooterLink to='/signin'>How We Work</FooterLink>
                <FooterLink to='/signin'>Our Works</FooterLink>
                <FooterLink to='/signin'>Couriers</FooterLink>
                <FooterLink to='/signin'>Terms of service</FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle>Second us</FooterLinkTitle> 
                <FooterLink to='/signin'>Sign In</FooterLink>
                <FooterLink to='/signin'>How We Work</FooterLink>
                <FooterLink to='/signin'>Our Works</FooterLink>
                <FooterLink to='/signin'>Couriers</FooterLink>
                <FooterLink to='/signin'>Terms of service</FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinkTitle>Third Us</FooterLinkTitle> 
                <FooterLink to='/signin'>Sign In</FooterLink>
                <FooterLink to='/signin'>How We Work</FooterLink>
                <FooterLink to='/signin'>Our Works</FooterLink>
                <FooterLink to='/signin'>Couriers</FooterLink>
                <FooterLink to='/signin'>Terms of service</FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinkTitle>Fourth Us</FooterLinkTitle> 
                <FooterLink to='/signin'>Sign In</FooterLink>
                <FooterLink to='/signin'>How We Work</FooterLink>
                <FooterLink to='/signin'>Our Works</FooterLink>
                <FooterLink to='/signin'>Couriers</FooterLink>
                <FooterLink to='/signin'>Terms of service</FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
          
        </FooterLinksContainer>
        <SocialMedia>
            <SocialMediaWrap>
              <SocialLogo to="/">Vidhigya Associates</SocialLogo>
              <WebsiteRights>
                Vidhigya Associates &#169; {new Date().getFullYear()} All rights reserved
              </WebsiteRights>
              <SocialIcons>
                <SocialIconLink href='/' target="_blank" aria-label="Facebook"><FaFacebook/></SocialIconLink>
                <SocialIconLink href='/' target="_blank" aria-label="Twitter"><FaTwitter/></SocialIconLink>
                <SocialIconLink href='/' target="_blank" aria-label="Instagram"><FaInstagram/></SocialIconLink>
                <SocialIconLink href='/' target="_blank" aria-label="Whatsapp"><FaWhatsapp/></SocialIconLink>
              </SocialIcons>
            </SocialMediaWrap>
            </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  )
}
