import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchProductById,
  selectProductState,
} from "@redux/features/productSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import AddProductForm from "../components/AddProduct";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const {
    productData: product,
    status,
    error,
  } = useAppSelector(selectProductState);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(parseInt(id, 10)));
    }
  }, [id]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "fail" && error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="product-detail">
      <AddProductForm productToEdit={product} />
    </div>
  );
};

export default ProductDetail;
