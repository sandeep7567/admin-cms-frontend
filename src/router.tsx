import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./layouts/Dashboard";
import NonAuth from "./layouts/NonAuth";
import Root from "./layouts/Root";
import HomePage from "./pages/HomePage";
import Auth from "./components/authentication/Auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
          {
            path: "/:storeId",
            element: <HomePage />,
          },
        ],
      },
      {
        path: "auth",
        element: <NonAuth />,
        children: [
          {
            path: "login",
            element: (
              <Auth
                description="Enter your email below to login to your account"
                title="Login"
                btnTitle="register"
                btnText="Don't have an account?"
                btnLink="/auth/register"
                submitBtnLabel="Login"
                formType="login"
                mode="page"
              />
            ),
          },
          {
            path: "register",
            element: (
              <Auth
                description="Enter your details below to register to your account"
                title="Register"
                btnTitle="login"
                btnText="Already have an account?"
                btnLink="/auth/login"
                submitBtnLabel="Sign up"
                formType="register"
                mode="page"
              />
            ),
          },
        ],
      },
    ],
  },
]);
