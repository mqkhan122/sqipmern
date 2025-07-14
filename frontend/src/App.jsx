import React from 'react'
import Nav from './Components/Nav'
import Main from './Components/Main'
import Footer from './Components/Footer'

import { Route, Routes } from 'react-router-dom'
import Adminlogin from './Components/Adminlogin'



const App = () => {
  return (
    <>
     <Nav />
    <Routes>
      <Route index element={<Main />} />
      <Route path='/admin' element={<Adminlogin />} />
    </Routes>
      <Footer />
   
  
    </>
  )
}

export default App