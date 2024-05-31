import { Order, ProductI, UserI } from ".";

export type MessageResponse = {
  id: string;
};

export type LogoutResponse = object;
export type LogoutRequest = object;

export type Paginated = {
  totalDocs: number;
  pageIndex: number;
  pageSize: number;
  pageCount: number;
};

export type ProductResponse = { product: ProductI };
export type ProductsResponse = {
  products: ProductI[];
  totalDocs: number;
  pageIndex: number;
  pageSize: number;
  pageCount: number;
};

export type OrdersResponse = {
  orders: Order[];
  totalDocs: number;
  pageIndex: number;
  pageSize: number;
  pageCount: number;
};
export type OrderResponse = { product: ProductI };

export type UsersResponse = {
  users: UserI[];
} & Paginated;

export type UserResponse = { users: UserI };

export type BulkDeleteResponse = {
  ids: string[];
  deletedCount: number;
  success: boolean;
};
