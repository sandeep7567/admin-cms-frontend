import { useAppSelector } from "@/hooks/redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const Setup = () => {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (user === null) {
    const redirect =
      new URLSearchParams(location.search).get("redirect") || "/auth/login";

    return <Navigate to={redirect} replace />;
  } else if (user.storeId.length > 0) {
    const storeIdRedirect = user?.storeId.includes(location.pathname)
      ? `${location.pathname}`
      : `/${user.storeId[0]}`;

    return <Navigate to={storeIdRedirect} replace />;
  }

  return <Outlet />;
};

export default Setup;
