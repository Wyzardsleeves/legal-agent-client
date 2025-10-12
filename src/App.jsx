import { useState } from 'react'
import './App.css'
import Page from './Components/Page'
import Navbar from './Components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <div>
        <Page />
      </div>
    </>
  )
}

export default App
