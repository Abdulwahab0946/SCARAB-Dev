import React, { useEffect } from "react";
import {
  fetchProducts,
  removeProduct,
  selectProducts,
  selectProductStatus,
  selectProductError,
} from "../redux/features/productSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@comp/ui/card";

const ProductListing: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const state = useAppSelector(selectProductStatus);
  const error = useAppSelector(selectProductError);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(removeProduct(id));
    }
  };

  const handleEdit = (id: number) => {
    // Logic to edit the product, e.g., redirecting to an edit page or opening a modal
    console.log("Edit product with ID:", id);
  };

  if (state === "loading") return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Our Product List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader className=" flex flex-row items-center justify-between ">
              <CardTitle>{product.name}</CardTitle>
              <div>
                <button
                  onClick={() => handleEdit(product.id)}
                  className="mr-2 text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className=" line-clamp-3">
                {product.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex flex-row justify-between items-center">
              <p>${product.price}</p>
              <p>Quantity: {product.quantity}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
