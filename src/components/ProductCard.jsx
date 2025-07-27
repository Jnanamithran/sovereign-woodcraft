import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const imageSrc = product.imageUrl || product.image || '';
  const title = product.name || product.title || 'Unnamed Product';
  const price = typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price;

  return (
    <Link to={`/product/${product._id}`} className="block">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
        <div className="relative">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-64 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/600x600?text=Image+Not+Found';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-amber-700 text-white py-2 px-6 rounded-full transform hover:scale-105 transition-transform">
              View Details
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-gray-600 mt-1">{price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
