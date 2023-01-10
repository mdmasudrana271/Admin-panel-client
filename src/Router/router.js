import { createBrowserRouter } from "react-router-dom";
import AddProduct from "../components/Dashboard/AddProducts/AddProducts";
import Dashboard from "../components/Dashboard/Dashboard";
import EditProduct from "../components/Dashboard/EditProduct/EditProduct";
import MyOrders from "../components/Dashboard/MyOrders/MyOrders";
import MyProducts from "../components/Dashboard/MyProducts/MyProducts";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Main from "../Layout/Main";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/home",
                element: <Home></Home>
            },
            {
                path: "/dashboard",
                element: <Dashboard></Dashboard>
            },
            {
                path: "/dashboard/my-orders",
                element: <MyOrders></MyOrders>
            },
            {
                path: "/dashboard/add-products",
                element: <AddProduct></AddProduct>
            },
            {
                path: "/dashboard/my-products",
                element: <MyProducts></MyProducts>
            },
            {
                path: "/my-products/:id",
                element: <EditProduct></EditProduct>,
                loader:({params})=> fetch(`https://admin-panel-server.vercel.app/products/${params.id}`)
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "register",
                element: <Register></Register>
            },
        ]
    },

])

export default router;