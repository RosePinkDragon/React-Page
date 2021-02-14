import React, { useState } from 'react'
import { ArrowForward, ArrowRight, HeroBg, HeroBtnWrapper, HeroContainer, HeroContent, HeroH1, HeroP, VideoBg } from './HeroElements'
import HeroBgImg from '../../images/HeroBg.jpg'
import { Button } from '../ButtonElement'

const HeroSection = () => {

  const [hover, setHover] = useState(false)

  const onHover = () => {
    setHover(!hover)
  }

  return (
    <HeroContainer>
      <HeroBg>
        <VideoBg src={HeroBgImg} />
      </HeroBg>
      <HeroContent>
        <HeroH1 style={{color: '#e6be03'}}>Vidhigya Associates</HeroH1>
        <HeroP>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi alias rerum suscipit provident, distinctio pariatur illum. Deserunt inventore voluptas suscipit tempore.
        </HeroP>
        <HeroBtnWrapper>
          <Button to="signup"  onMouseEnter={onHover} onMouseLepave={onHover}>
            Contact Us { hover ? <ArrowRight />  : <ArrowForward /> }
          </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  )
}

export default HeroSection
