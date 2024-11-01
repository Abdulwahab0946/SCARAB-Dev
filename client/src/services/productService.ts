import apiClient from "../api/apiClient";
import { CreateProductDto } from "@/types";

export const createProduct = (product: CreateProductDto) =>
  apiClient.post("/products", product);

export const getProducts = () => apiClient.get("/products");

export const getProductById = (id: number) => apiClient.get(`/products/${id}`);

export const updateProduct = (id: number, product: Partial<CreateProductDto>) =>
  apiClient.put(`/products/${id}`, product);

export const deleteProduct = (id: number) =>
  apiClient.delete(`/products/${id}`);
