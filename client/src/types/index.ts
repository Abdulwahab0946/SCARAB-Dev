import { ConfigState } from "./common";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
}

export interface ReqConfig {
  isLoading: boolean;
  error: string | null;
}

export type CreateProductDto = Omit<Product, "id">;

export interface ProductState extends ConfigState {
  productData: Product | null;
  productList: Product[];
}
