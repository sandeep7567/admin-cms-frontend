import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/redux/api/productApiSlice";
import { ProductDataApiRequest } from "@/types";

export const useProductMutation = (productId?: string) => {
  const [createProduct, createState] = useCreateProductMutation();
  const [updateProduct, updateState] = useUpdateProductMutation();

  const mutateProduct = async ({
    storeId,
    formData,
  }: ProductDataApiRequest) => {
    if (productId) {
      return updateProduct({ storeId, productId, formData });
    } else {
      return createProduct({ storeId, formData });
    }
  };

  const state = productId ? updateState : createState;

  return {
    mutateProduct,
    ...state,
  };
};
