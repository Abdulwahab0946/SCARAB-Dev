import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/add-product" className="hover:underline">
              Add Product
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:underline">
              Product Listing
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
