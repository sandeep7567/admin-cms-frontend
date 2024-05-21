import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./router.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { Toaster } from "@/components/ui/sonner";
import ModalProvider from "./providers/ModalProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider />
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </React.StrictMode>
);
