import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import Login from "../pages/Login/Login";
import SignUp from "../pages/Login/SignUp";
import About from "../pages/About";
import HasAuth from "../HOC/HasAuth";
import Medicine from "../pages/Medicine";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import Checkout from "../pages/Checkout";
import Contact from "../pages/Contact";
import Admin from "../pages/Admin";
import AdminOrders from "../pages/AdminOrders";
import AdminUsers from "../pages/AdminUsers";
import MedicineForm from "../pages/MedicineForm";
import MedicineDetail from "../pages/MedicineDetail";
import MedicineLayout from "../pages/MedicineLayout";
import NotFound from "../pages/NotFound";
import AuthGuard from "../HOC/AuthGuard";
import MedicineSalesCharts from "../pages/MedicinesSalesChart";
import ConfirmEmail from "../pages/Login/ConfirmEmail";
import ForgotPassword from "../pages/Login/ForgotPassword";
import ChangePassword from "../pages/Login/ChangePassword";
import NotificationsList from "../pages/NotificationList";
import OrderDetails from "../pages/OrderDetails";

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
                        },
                        {
                            path: '/medicines/details/:id',
                            element: <MedicineDetail />
                        }
                    ]
                },
                {
                    path: '/admin/addMedicine/',
                    element: <AuthGuard adminOnly={true}><MedicineForm /></AuthGuard>
                },
                {
                    path: '/medicines/:type',
                    element: <Medicine />,
                },
                {
                    path: '/cart',
                    element: <AuthGuard><Cart /></AuthGuard>
                },
                {
                    path: '/admin/orders',
                    element:<Outlet />,
                    children:[
                        {
                            index:true,
                            element:<AdminOrders />
                        },
                        {
                            path:'/admin/orders/:orderId',
                            element:<OrderDetails />
                        }
                    ]
                },
                {
                    path: '/admin/users',
                    element: <AuthGuard adminOnly={true}><AdminUsers /></AuthGuard>
                },
                {
                    path: '/admin/sales',
                    element: <AuthGuard adminOnly={true}><MedicineSalesCharts /></AuthGuard>
                },
                {
                    path: '/orders',
                    element: <Outlet />,
                    children:[
                        {
                            index:true,
                            element:<Orders />
                        },
                        {
                            path:'/orders/:orderId',
                            element:<OrderDetails />
                        }
                    ]
                },
                {
                    path: '/confirm-email/:token',
                    element: <ConfirmEmail />,
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
                    element: <AuthGuard adminOnly={true}><Admin /></AuthGuard>
                },
                {
                    path: '/notFound',
                    element: <NotFound />
                },
                {
                    path: '/notification',
                    element: <NotificationsList />
                },
                {
                    path: '/forgot-password',
                    element: <ForgotPassword />
                },
                {
                    path: '/change-password/:confirmationToken',
                    element: <ChangePassword />
                },
                {
                    path: '*',
                    element: <NotFound />
                }
            ]
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
};

export default AllRoutes;
