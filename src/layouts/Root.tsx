import ModalProvider from "@/providers/ModalProvider";
import SheetProvider from "@/providers/SheetProvider";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <ModalProvider />
      <SheetProvider />
      <Outlet />
    </>
  );
};

export default Root;
