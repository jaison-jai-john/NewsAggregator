import { createBrowserRouter, RouterProvider } from "react-router"
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Layout from "./components/Layout"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
