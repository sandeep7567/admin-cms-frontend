export type LoginCredentials = {
  email: string;
  password: string;
};
export type RegisterCredentials = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  storeId: string[];
};

export type CreateUserData = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  tenantId: number;
};

export type Store = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateStoreData = {
  name: string;
};

export type QueryParams = {
  currentPage: number;
  perPage: number;
  q?: string;
  role?: string;
  isPublish?: boolean;
  tenantId?: number;
};

export type FieldData = {
  name: string[];
  value?: string;
};

export interface PriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: string[];
  };
}

export interface Attribute {
  name: string;
  widgetType: "switch" | "radio";
  defaultValue: string;
  availableOptions: string[];
}

export type Category = {
  _id: string;
  name: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attribute[];
};

export type ProductAttribute = {
  name: string;
  value: string | boolean;
};

export interface PropertyI {
  _id?: string;
  name: string;
  value: string | number | boolean | string[] | number[];
}

export interface ProductI {
  _id: string;
  storeId: string;
  name: string;
  price: number;
  archived: boolean;
  featured: boolean;
  properties: PropertyI[];
  imageFile: string;
  createdAt: string;
  updatedAt: string;
}

export type ImageField = {
  file: File;
};

export type CreateProductData = ProductI & { image: ImageField };

export type ProductDataApiRequest = {
  storeId: string;
  productId?: string;
  formData: FormData;
};
