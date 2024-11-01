import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchProductById,
  selectProductState,
} from "@redux/features/productSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Button } from "@/components/ui/button";

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
      <h2 className="text-2xl font-semibold">{product.name}</h2>
      <p className="text-lg">Price: ${product.price}</p>
      <p className="mt-4">{product.description}</p>
      <p className="mt-4">Quantity Available: {product.quantity}</p>
      <Button variant="outline">Add to Cart</Button>
    </div>
  );
};

export default ProductDetail;
