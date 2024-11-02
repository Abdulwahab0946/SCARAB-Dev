import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CreateProductDto, ProductState } from "../../types";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../../services/productService";
import { RootState } from "../store";
import { toast } from "@/hooks/use-toast";

const initialState: ProductState = {
  productList: [],
  status: "idle",
  error: null,
  productData: null,
};

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await getProducts();
      return response.data.data;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to Fetch Products",
        description:
          // @ts-expect-error  TODO: fix later by adding
          error.message || "An error occurred while fetching products.",
      });
      throw error;
    }
  }
);

// Add a new product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product: CreateProductDto) => {
    try {
      const response = await createProduct(product);
      toast({
        variant: "default",
        title: "Product Added",
        description: `${product.name} added successfully`,
      });
      return response.data;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to Add Product",
        description:
          // @ts-expect-error  TODO: fix later by adding
          error.message || "An error occurred while adding the product.",
      });
      throw error;
    }
  }
);

// Fetch product by ID
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: number) => {
    try {
      const response = await getProductById(id);
      return response.data.data;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to Fetch Product",
        description:
          // @ts-expect-error  TODO: fix later by adding
          error.message || "An error occurred while fetching the product.",
      });
      throw error;
    }
  }
);

// Edit an existing product
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, product }: { id: number; product: CreateProductDto }) => {
    try {
      console.log(product);
      
      const response = await updateProduct(id, product);
      toast({
        variant: "default",
        title: "Product Updated",
        description: `${product.name} updated successfully`,
      });
      return response.data;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to Edit Product",
        description:
          // @ts-expect-error  TODO: fix later by adding
          error.message || "An error occurred while editing the product.",
      });
      throw error;
    }
  }
);

// Remove a product
export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (id: number) => {
    try {
      await deleteProduct(id);
      toast({
        variant: "default",
        title: "Product Removed",
        description: `Product with ID ${id} removed successfully`,
      });
      return id;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to Remove Product",
        description:
          // @ts-expect-error  TODO: fix later by adding
          error.message || "An error occurred while removing the product.",
      });
      throw error;
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.productList = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.productList.push(action.payload);
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.productList = state.productList.filter(
          (product) => product.id !== action.payload
        ); // Remove the product from the list
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productData = action.payload;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.productList.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.productList[index] = action.payload;
        }
      });
  },
});

// Selectors
export const selectProductState = (state: RootState) => state.product;
export const selectProducts = (state: RootState) => state.product.productList;
export const selectProductStatus = (state: RootState) => state.product.status;
export const selectProductError = (state: RootState) => state.product.error;

export default productSlice.reducer;
