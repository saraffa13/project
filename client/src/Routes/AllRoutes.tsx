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
import Checkout from "../pages/Checkout"
import Contact from "../pages/Contact"
import Admin from "../pages/Admin"
import AdminOrders from "../pages/AdminOrders"
import AdminUsers from "../pages/AdminUsers"
import MedicineForm from "../pages/MedicineForm"

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
                    path:'/medicines/',
                    element:<Medicine />,
                },
                {
                    path:'/addMedicine/',
                    element:<MedicineForm />,
                },
                {
                    path:'/medicines/:type',
                    element:<Medicine />,
                },
                {
                    path:'/cart',
                    element:<Cart />
                },
                {
                    path:'/admin/orders',
                    element:<AdminOrders />
                },
                {
                    path:'/admin/users',
                    element:<AdminUsers />
                },
                {
                    path:'/orders',
                    element:<Orders />
                },
                {
                    path:'/checkout',
                    element:<Checkout />
                },
                {
                    path:'/contact',
                    element:<Contact />
                },
                {
                    path:'/admin',
                    element:<Admin />
                },
            ]
        }
    ])

  return (
    <RouterProvider router={router}/>
  )
}

export default AllRoutes
