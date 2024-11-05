import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Homepage = () => {
  return (
    <div className="max-h-screen bg-white">
      {/* Header */}
      <Navbar/>
      <Outlet/>
      </div>
  )
}

export default Homepage