import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home";
import Main from "../Layout/Main";
import Login from "../Components/Registration/Login";
import Registration from "../Components/Registration/Registration";
import OtpVerify from "../Components/Registration/OtpVerify";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Registration />,
      },
      {
        path: "otp",
        element: <OtpVerify />,
      },
    ],
  },
]);
