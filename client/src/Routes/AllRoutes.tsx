import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "../pages/Home"
import Layout from "../pages/Layout"
import Login from "../pages/Login/Login"
import SignUp from "../pages/Login/SignUp"
import About from "../pages/About"
import HasAuth from "../HOC/HasAuth"
import Medicine from "../pages/Medicine"
import Cart from "../pages/Cart"
import Orders from "../pages/Orders"

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
                    element:<HasAuth><Login /></HasAuth>
                },
                {
                    path:'/signup',
                    element:<HasAuth><SignUp /></HasAuth>
                },
                {
                    path:'/about',
                    element:<About />
                },
                {
                    path:'/medicines',
                    element:<Medicine />
                },
                {
                    path:'/cart',
                    element:<Cart />
                },
                {
                    path:'/orders',
                    element:<Orders />
                },
            ]
        }
    ])

  return (
    <RouterProvider router={router}/>
  )
}

export default AllRoutes
