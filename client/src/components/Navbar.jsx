import React from 'react'
import { Menu } from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { logout } from '../redux/authSlice'
import { logoutUser } from '../api/user'

const Navbar = () => {
  const { isAuthenticated } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logoutUser()
    dispatch(logout())
    navigate('/auth/login')
  }

  return (
    <header className="flex items-center justify-between p-4 bg-[#4285F4]">
      <button className="text-white p-2">
        <Menu className="h-6 w-6" />
      </button>

      {isAuthenticated ? <button  className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition-colors text-white" onClick={handleLogout}>  
        Logout
      </button> :

        <div className="flex items-center gap-4">
          <Link to="/auth/login" className="text-white hover:text-gray-100">
            Login
          </Link>
          <Link
            to="/auth/signup"
            className="bg-white text-[#4285F4] px-4 py-2 rounded-md hover:bg-gray-100"
          >
            Signup
          </Link>
        </div>
      }
    </header>
  )
}

export default Navbar