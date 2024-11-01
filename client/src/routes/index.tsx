import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/default";

import AddProductPage from "../pages/AddProduct";
import ProductsPage from "../pages/Products";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <h1 className="text-3xl">Welcome to the Product Management App</h1>
          }
        />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
