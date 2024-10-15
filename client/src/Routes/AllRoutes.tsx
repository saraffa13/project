import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "../pages/Home"
import Layout from "../pages/Layout"
import Login from "../pages/Login/Login"
import SignUp from "../pages/Login/SignUp"

const AllRoutes = () => {
    
    const router = createBrowserRouter([
        {
            path:"/",
            element: <Layout />,
            children : [
                {
                    index:true,
                    element:<Home />
                },
                {
                    path:'/login',
                    element:<Login />
                },
                {
                    path:'/signup',
                    element:<SignUp />
                },
            ]
        }
    ])

  return (
    <RouterProvider router={router}/>
  )
}

export default AllRoutes
