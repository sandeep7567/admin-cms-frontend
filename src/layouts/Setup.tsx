import { useAppSelector } from "@/hooks/redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const Setup = () => {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  console.log("object", user);

  if (user === null) {
    return (
      <Navigate to={`/auth/login?redirect=${location.pathname}`} replace />
    );
  } else if (user.storeId !== null) {
    return <Navigate to={`/${user.storeId[0]}`} replace />;
  }

  return <Outlet />;
};

export default Setup;
