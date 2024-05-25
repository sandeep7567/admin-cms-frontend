import { ProductI } from ".";

export type MessageResponse = {
  id: string;
};

export type LogoutResponse = object;
export type LogoutRequest = object;

export type ProductsResponse = { products: ProductI[] };
export type ProductResponse = { product: ProductI };

export type ProductBulkDeleteResponse = {
  ids: string[];
  deletedCount: number;
  success: boolean;
};
