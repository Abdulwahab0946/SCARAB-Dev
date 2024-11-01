import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/default";

import AddProductPage from "../pages/AddProduct";
import ProductsPage from "../pages/Products";
import ProductPage from "../pages/Product";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
