import React, { useState, useEffect } from "react";
import { addProduct, editProduct } from "../redux/features/productSlice";
import { Product, type CreateProductDto } from "@/types";
import { useAppDispatch } from "@redux/hooks";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface AddProductProps {
  productToEdit?: Product;
}

const initState = {
  name: "",
  price: 0,
  description: "",
  quantity: 10,
};

const AddProduct: React.FC<AddProductProps> = ({ productToEdit }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState<CreateProductDto>(initState);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "price") {
      const parsedValue = parseFloat(value);
      if (parsedValue < 0) {
        setError("Price must be a positive number.");
        return;
      } else {
        setError(null);
      }
      setProduct((prev) => ({ ...prev, price: parsedValue }));
    } else if (name === "quantity") {
      const parsedValue = parseInt(value, 10);
      if (parsedValue < 0) {
        setError("Quantity cannot be negative.");
        return;
      } else {
        setError(null);
      }
      setProduct((prev) => ({ ...prev, quantity: parsedValue }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (product.price <= 0) {
      setError("Price must be a positive number.");
      return;
    }
    if (product.quantity < 0) {
      setError("Quantity cannot be negative.");
      return;
    }

    try {
      if (productToEdit) {
        await dispatch(editProduct({ id: productToEdit.id, product })).unwrap();
      } else {
        await dispatch(addProduct(product)).unwrap();
      }
      navigate("/");
    } catch (error) {
      console.error("Error has occurred:", error);
    }
  };

  useEffect(() => {
    if (productToEdit) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, price, ...productWithoutId } = productToEdit;
      setProduct({ ...productWithoutId, price: parseFloat(price.toString()) });
    }
    return () => {
      setProduct(initState);
    };
  }, [productToEdit]);

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">
        {productToEdit ? "Edit Product" : "Add New Product"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={product.quantity.toString()}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <Button
          type="submit"
          variant="default"
          className="w-full font-semibold py-2 rounded-md"
        >
          {productToEdit ? "Update" : "Add"}
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
