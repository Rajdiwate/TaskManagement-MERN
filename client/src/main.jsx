import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Auth from './pages/Auth.jsx';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import {Provider, useDispatch} from 'react-redux'
import { getUser } from './redux/authSlice.js';
import { store } from './redux/store.js';
import Homepage from './pages/Homepage.jsx';
import AddTask from './pages/AddTask.jsx';
import TaskDetails from './pages/TaskDetails.jsx';
import EditTask from './pages/EditTask.jsx';
import Protected from './components/Protected.jsx';
import Signup from './components/Signup.jsx';

const router = createBrowserRouter([
  {
    path: "/auth/",
    element: <Auth/>,
    children : [
      {
        path : 'signup',
        element : <Signup/>
      },
      {
        path : 'login',
        element : <Login/>
      },
    ]
  },
  {
    path : '/',
    element : <Homepage/>,
    children :[
      {
        path : '',
        element :<Protected><Home/></Protected> 
      },
      {
        path : 'add-task',
        element : <Protected><AddTask/></Protected>
      },
      {
        path : 'details/:id',
        element : <Protected><TaskDetails/></Protected>
      },
      {
        path : 'edit/:id',
        element : <Protected><EditTask/>  </Protected>
      }
    ]
  },

  
]);

// Custom component to handle initial authentication check
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the getUser action on mount
    dispatch(getUser());
  }, [dispatch]);


  return <RouterProvider router={router} />;
}

// Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);