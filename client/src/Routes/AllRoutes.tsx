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
import MedicineDetail from "../pages/MedicineDetail"
import MedicineLayout from "../pages/MedicineLayout"
import NotFound from "../pages/NotFound"
import Authentication from "../HOC/Authentication"
import AdminAuth from "../HOC/AdminAuth"

const AllRoutes = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Home />
                },
                {
                    path: '/login',
                    element: <HasAuth><Login /></HasAuth>
                },
                {
                    path: '/signup',
                    element: <HasAuth><SignUp /></HasAuth>
                },
                {
                    path: '/about',
                    element: <About />
                },
                {
                    path: '/medicines/',
                    element: <MedicineLayout />,
                    children: [
                        {
                            index: true,
                            element: <Medicine />
                        }, {
                            path: '/medicines/details/:id',
                            element: <MedicineDetail />
                        }
                    ]
                },
                {
                    path: '/admin/addMedicine/',
                    element: <Authentication><AdminAuth><MedicineForm /></AdminAuth> </Authentication>
                },
                {
                    path: '/medicines/:type',
                    element: <Medicine />,
                },
                {
                    path: '/cart',
                    element: <Authentication><Cart /></Authentication>
                },
                {
                    path: '/admin/orders',
                    element: <Authentication><AdminAuth><AdminOrders /></AdminAuth> </Authentication>
                },
                {
                    path: '/admin/users',
                    element: <Authentication><AdminAuth><AdminUsers /></AdminAuth> </Authentication>
                },
                {
                    path: '/orders',
                    element: <Orders />
                },
                {
                    path: '/checkout',
                    element: <Checkout />
                },
                {
                    path: '/contact',
                    element: <Contact />
                },
                {
                    path: '/admin',
                    element: <Authentication><AdminAuth><Admin /></AdminAuth> </Authentication>
                },
                {
                    path: '/notFound',
                    element: <NotFound />
                },
                {
                    path: '*',
                    element: <NotFound />
                }
            ]
        }
    ])

    return (
        <RouterProvider router={router} />
    )
}

export default AllRoutes
