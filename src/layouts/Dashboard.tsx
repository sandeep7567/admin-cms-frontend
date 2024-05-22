import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import React, { useEffect } from "react";
import { onClose } from "@/redux/reducer/storeSlice";
import { useLogoutMutation } from "@/redux/api/apiSlice";
import { toast } from "sonner";
import Sidebar from "@/components/dashboard/Sidebar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "@/components/dashboard/Header";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      toast(`Logged out successfully`);
    } catch (error) {
      console.error("Logout failed", error);
      toast(`Couldn't log out`);
    }
  };

  useEffect(() => {
    if (user && user.storeId.length > 0) {
      dispatch(onClose());
    }
  }, [dispatch, user]);

  if (user === null) {
    return (
      <Navigate to={`/auth/login?redirect=${location.pathname}`} replace />
    );
  }

  if (user && !user.storeId?.length) {
    return <Navigate to={`/`} replace />;
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[250px_1fr]">
      <Sidebar user={user} />
      <div className="flex flex-col">
        <Header
          user={user}
          handleLogout={handleLogout}
          showNewTeamDialog={showNewTeamDialog}
          setShowNewTeamDialog={setShowNewTeamDialog}
        />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
