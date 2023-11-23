import { createBrowserRouter } from "react-router-dom";
import MainLayOut from "../LayOut/MainLayOut";
import Home from "../Pages/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import PrivateRoute from "./PrivateRoute";
import Dashbord from "../LayOut/Dashbord";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import MangeItems from "../Pages/Dashboard/ManageItems/MangeItems";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut></MainLayOut>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "menu",
        element: <Menu></Menu>,
      },
      {
        path: "order/:category",
        element: <Order></Order>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Registration></Registration>,
      },
    
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashbord></Dashbord>
      </PrivateRoute>
    ),
    children: [
      {
        path:'userHome',
        element:<UserHome></UserHome>
      },
      {
        path: "cart",
        element: <Cart></Cart>,
      },
      {
        path:'payment',
        element:<Payment></Payment>
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      // admin lavel
      {
        path: "manageItems",
        element: (
          <AdminRoute>
            <MangeItems></MangeItems>
          </AdminRoute>
        ),
      },

      {
        path: "updateItem/:id",
        element: (
          <AdminRoute>
            <UpdateItem></UpdateItem>
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://final-project-server-henna.vercel.app/menu/${params.id}`),
      },
      {
        path:'adminHome',
        element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      
      {
        path: "addItems",
        element: (
          <AdminRoute>
            {" "}
            <AddItems></AddItems>
          </AdminRoute>
        ),
      },
      {
        path: "users",
        element: (
          <AdminRoute>
            {" "}
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
     
    ],
  },
]);

export default Routes;
