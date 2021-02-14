import React from 'react'
import { ServicesCard, ServicesContainer, ServicesH1, ServicesH2, ServicesIcon, ServicesP, ServicesWrapper } from './ServiceElements'

import Icon1 from '../../images/finance.svg'
import Icon2 from '../../images/invest.svg'
import Icon3 from '../../images/wallet.svg'

export default function Services() {
  return (
    <ServicesContainer id='services'>
      <ServicesH1>Our Services</ServicesH1>
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src={Icon3}/>
          <ServicesH2>Real Estates</ServicesH2>
          <ServicesP>Title diligence and underlying property and issuing reports.</ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon2}/>
          <ServicesH2>Dispute Resolution</ServicesH2>
          <ServicesP>Determining a dispute resolution strategy.</ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon1}/>
          <ServicesH2>Bankruptcy & Insolvency</ServicesH2>
          <ServicesP>Advising companies investing in distressed companies undergoing insolvency proceedings.</ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  )
}
