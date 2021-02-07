// ** This is a basic code with no animations.
// !! This is just for ref purposes with the dropdown menu

import { useState } from "react";
import Dropdown from "./components/Dropdown";
import Hero from "./components/Hero";
import InfoSection from "./components/InfoSection";
import Navbar from "./components/Navbar";
import { SliderData } from "./data/SliderData";
import GlobalStyle from './GlobalStyle';


function App() {

  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    console.log(` :triffer `)
    setIsOpen(!isOpen)
  }

  return (
    <>
      <GlobalStyle />
      <Navbar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <Hero slides={SliderData} />
      <InfoSection />
    </>
  );
}

export default App;
