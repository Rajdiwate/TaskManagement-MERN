import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  // State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const{isAuthenticated} = useSelector(state=> state.user)
  

  // Handle form submission
  const handleSubmit =async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:8000/api/login' , {email , password} , {withCredentials : true})
    console.log(res.data.user)
    navigate('/')
  };

  // Handle login with Google button click
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/api/auth/google";
  };
  useEffect(()=>{
    console.log("login" , isAuthenticated)
  },[])

  return (
    <>
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-semibold text-center mb-8">Login</h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/auth/signup" className="text-blue-700 hover:underline text-base">
                Signup
              </Link>
            </p>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex text-white items-center justify-center gap-2 bg-blue-500 border border-gray-300 px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Login with Google
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
