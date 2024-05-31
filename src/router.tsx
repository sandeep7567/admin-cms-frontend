import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./layouts/Dashboard";
import NonAuth from "./layouts/NonAuth";
import Root from "./layouts/Root";
import HomePage from "./pages/HomePage";
import Auth from "./components/authentication/Auth";
import SetupPage from "./pages/setup/SetupPage";
import Setup from "./layouts/Setup";
import ProductPage from "./pages/product/product";
import CustomerPage from "./pages/customer/customer";
import OrderPage from "./pages/order/order";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Setup />,
        children: [
          {
            path: "",
            element: <SetupPage />,
          },
        ],
      },
      {
        path: "",
        element: <Dashboard />,
        children: [
          {
            path: ":storeId",
            element: <HomePage />,
          },
          {
            path: ":storeId/products",
            element: <ProductPage />,
          },
          {
            path: ":storeId/customers",
            element: <CustomerPage />,
          },
          {
            path: ":storeId/orders",
            element: <OrderPage />,
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
