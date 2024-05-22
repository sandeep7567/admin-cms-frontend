import { useAppSelector } from "@/hooks/redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const Setup = () => {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (user === null) {
    const redirect =
      new URLSearchParams(location.search).get("redirect") || "/";

    return <Navigate to={redirect} replace />;
  } else if (user.storeId.length > 0) {
    return <Navigate to={`/${user.storeId[0]}`} replace />;
  }

  return <Outlet />;
};

export default Setup;
