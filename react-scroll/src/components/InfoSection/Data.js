// image import here

// svg imports here
import Lawyer from '../../images/lawyer.svg'
import Finance from '../../images/finance.svg'
import Careers from '../../images/careers.svg'

export const homeObjOne = {
  id: 'about',
  lightBg: false,
  lightText: true,
  lightTextDesc: true,
  topLine: 'Professional and Experienced Law Attorney',
  headline: 'You\'ve Come To The Right Place',
  description: 'V.A Law Offices is full-service law firm situated in Navi Mumbai, India. The firm provides services extensively in the areas of legal practices. The key objective behind setting up V.A Law Offices is to render finest legal and commercial advices, protecting rights and resolving disputes.',
  // buttonLabel: 'Get Started',
  imgStart: false,
  img: Lawyer,
  alt: 'Car',
  dark: true,
  primary: true,
  darkText: false
};

export const homeObjTwo = {
  id: 'practice',
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  topLine: 'Vidhigya Associates',
  headline: 'The Name Vidhigya',
  description: 'The word Vidhigya means Jurist or a Specialist in Law. We believe that the name articulates our quality and work. We constantly learn through our interactions with seasoned practitioners and seek to adopt best practices in legal services delivery. Vidhigya values the satisfaction of clients and consider it as its key measure of success.',
  // buttonLabel: 'Get Started',
  imgStart: true,
  img: Finance,
  alt: 'Car',
  dark: false,
  primary: false,
  darkText: true,
};

export const homeObjThree = {
  id: 'careers',
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  topLine: 'Why Choose Us',
  headline: 'Our Lawyers',
  description: 'Our lawyers are highly skilled, proficient and well versed with legal knowledge and have an excellent grip on local jurisdiction. We have expert lawyers specialized in different practice areas, benefiting from experience of the older generation and fresh ideas of the younger generation to provide a unique combination of skills and expertise to help clients resolve their most complex legal and commercial issues.',
  // buttonLabel: 'Get Started',
  imgStart: true,
  img: Careers,
  alt: 'Car',
  dark: false,
  primary: false,
  darkText: true,
};