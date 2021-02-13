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
      ]<HeroContent>
        <HeroH1>Virtual Banking Made Easy</HeroH1>
        <HeroP>
          Sign up for a new account today and receive $250 in credit towards your next payment,
        </HeroP>
        <HeroBtnWrapper>
          <Button to="signup"  onMouseEnter={onHover} onMouseLeave={onHover}>
            Get Started { hover ?  <ArrowForward /> : <ArrowRight /> }
          </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  )
}

export default HeroSection
