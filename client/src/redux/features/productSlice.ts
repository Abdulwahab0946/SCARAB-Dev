import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CreateProductDto, ProductState } from "../../types";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../../services/productService";

const initialState: ProductState = {
  productList: [],
  status: "idle",
  error: null,
  productData: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await getProducts();
    return response;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product: CreateProductDto) => {
    const response = await createProduct(product);
    return response;
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: string) => {
    const response = await getProductById(id);
    return response;
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({
    id,
    product,
  }: {
    id: string;
    product: Partial<CreateProductDto>;
  }) => {
    const response = await updateProduct(id, product);
    return response;
  }
);

export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (id: string) => {
    await deleteProduct(id);
    return id;
  }
);

// Create the products slice
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
        state.status = "success";
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.productList.push(action.payload);
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.productList = state.productList.filter(
          (product) => product.id !== parseInt(action.payload, 10)
        );
      });
  },
});

export const selectProducts = (state: { products: ProductState }) =>
  state.products.productList;

export const selectProductStatus = (state: { products: ProductState }) =>
  state.products.status;

export const selectProductError = (state: { products: ProductState }) =>
  state.products.error;

export default productSlice.reducer;
