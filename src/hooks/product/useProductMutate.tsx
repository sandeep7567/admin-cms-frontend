import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/redux/api/productApiSlice";
import { ProductDataApiRequest } from "@/types";
import { toast } from "sonner";

export const useProductMutation = (productId?: string) => {
  const [createProduct, createState] = useCreateProductMutation();
  const [updateProduct, updateState] = useUpdateProductMutation();

  const mutateProduct = async ({
    storeId,
    formData,
  }: ProductDataApiRequest) => {
    if (productId) {
      return await updateProduct({ storeId, productId, formData });
    } else {
      return await createProduct({ storeId, formData });
    }
  };

  const state = productId ? updateState : createState;
  const { isSuccess, error, isError } = state;

  if (isSuccess) {
    toast.success(`Product created`);
  }

  if (isError && error) {
    if ("status" in error) {
      // Assuming it's a FetchBaseQueryError
      const errMsg =
        "error" in error ? error.error : JSON.stringify(error.data);

      toast.error(errMsg || "Product not created!");
    } else {
      toast.error("Something went wrong2!");
    }
  }

  return { mutateProduct, ...state };
};
