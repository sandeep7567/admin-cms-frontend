import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import React, { useEffect } from "react";
import { onClose } from "@/redux/reducer/storeSlice";
import { useLogoutMutation } from "@/redux/api/apiSlice";
import { toast } from "sonner";
import Sidebar from "@/components/dashboard/Sidebar";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "@/components/dashboard/Header";
import { Home, Package, ShoppingCart, Users } from "lucide-react";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const storeId = user && user.storeId[0];

  const navLinks = [
    {
      to: `${storeId}`,
      icon: Home,
      label: "Dashboard",
      active: location.pathname === `/${storeId}`,
    },
    {
      to: `${storeId}/products`,
      icon: Package,
      label: "Products",
      active: location.pathname === `/${storeId}/products`,
    },
    {
      to: `${storeId}/orders`,
      icon: ShoppingCart,
      label: "Orders",
      badgeCount: 6,
      active: location.pathname === `/${storeId}/orders`,
    },
    {
      to: `${storeId}/customers`,
      icon: Users,
      label: "Customers",
      active: location.pathname === `/${storeId}/customers`,
    },
  ];

  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);

  const [logout, { isLoading }] = useLogoutMutation();

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
      <Sidebar navLinks={navLinks} />
      <div className="flex flex-col">
        <Header
          user={user}
          handleLogout={handleLogout}
          showNewTeamDialog={showNewTeamDialog}
          setShowNewTeamDialog={setShowNewTeamDialog}
          navLinks={navLinks}
          disabled={isLoading}
        />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
