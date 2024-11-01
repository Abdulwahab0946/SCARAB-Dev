import apiClient from "../api/apiClient";
import { CreateProductDto } from "../types";

export const createProduct = async (product: CreateProductDto) => {
  const response = await apiClient.post("/products", product);
  return response.data;
};

export const getProducts = async () => {
  const response = await apiClient.get("/products");
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

export const updateProduct = async (
  id: string,
  product: Partial<CreateProductDto>
) => {
  const response = await apiClient.put(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await apiClient.delete(`/products/${id}`);
  return response.data;
};
