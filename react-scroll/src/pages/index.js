import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Navbar/Sidebar'

const Home = () => {
  
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    console.log(` 🔥 `)
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Sidebar isOpen={ isOpen } toggle={ toggle }/>
      <Navbar toggle={ toggle }/>
    </>
  )
}

export default Home
