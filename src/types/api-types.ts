import { ProductI } from ".";

export type MessageResponse = {
  id: string;
};

export type LogoutResponse = object;
export type LogoutRequest = object;

export type ProductRespone = { products: ProductI[] };

export type ProductBulkDeleteResponse = {
  ids: string[];
  deletedCount: number;
  success: boolean;
};
