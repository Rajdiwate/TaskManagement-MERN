import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const Auth = () => {
  return (
    <div className="max-h-screen bg-white overflow-hidden">
      {/* Header */}
      <Navbar/>
      <Outlet/>
      </div>
  )
}

export default Auth