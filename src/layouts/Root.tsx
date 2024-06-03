// import { usePreventDevTools } from "@/hooks/ui/usePreventDevtools";
import ModalProvider from "@/providers/ModalProvider";
import SheetProvider from "@/providers/SheetProvider";
import { Outlet } from "react-router-dom";

const Root = () => {
  // usePreventDevTools();
  return (
    <div>
      <ModalProvider />
      <SheetProvider />
      <Outlet />
    </div>
  );
};

export default Root;
