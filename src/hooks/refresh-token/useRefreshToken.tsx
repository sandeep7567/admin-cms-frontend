import { useEffect, useState } from "react";
import { useLogoutMutation, useRefreshTokenQuery } from "@/redux/api/apiSlice";

export const useRefreshToken = () => {
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [reuseApi, setReuseApi] = useState<boolean>(false);
  const { data: refreshData, error: refreshError } = useRefreshTokenQuery(
    {},
    { skip: statusCode !== 401 }
  );
  const [logout] = useLogoutMutation();

  useEffect(() => {
    const handleRefreshToken = async () => {
      if (statusCode === 401) {
        if (refreshData) {
          // Token has been refreshed, reset statusCode
          setStatusCode(null);
          setReuseApi(true);
        }

        if (refreshError) {
          console.error("Failed to refresh token:", refreshError);
          // Handle error appropriately, e.g., force logout
          try {
            await logout({}).unwrap();
            setReuseApi(false);
          } catch (error) {
            console.error("Logout failed after token refresh error:", error);
          }
        }
      }
    };

    handleRefreshToken();
  }, [statusCode, refreshData, refreshError, logout]);

  const refreshAccessToken = (code: number) => {
    setStatusCode(code);
  };

  return [refreshAccessToken, reuseApi];
};
