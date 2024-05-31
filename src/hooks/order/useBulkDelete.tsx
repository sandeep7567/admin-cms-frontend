import { useBulkDeleteOrdersMutation } from "@/redux/api/orderApiSlice";
import { toast } from "sonner";

export const useBulkDeleteOrders = () => {
  const [deleteBulkOrders, { isError, isLoading, isSuccess, error }] =
    useBulkDeleteOrdersMutation();

  if (isSuccess) {
    toast.success(`Orders deleted`);
  }

  if (isError && error) {
    if ("status" in error) {
      const errMsg =
        "error" in error ? error.error : JSON.stringify(error.data);

      toast.error(errMsg || "Failed to delete orders");
    } else {
      toast.error("Failed to delete orders");
    }
  }

  return { deleteBulkOrders, isLoading };
};
