import React from 'react';

const ProductCard = ({ product }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden group">
    <div className="relative">
      <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="bg-amber-700 text-white py-2 px-6 rounded-full transform hover:scale-105 transition-transform">
          View Details
        </button>
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="text-gray-600 mt-1">{product.price}</p>
    </div>
  </div>
);

export default ProductCard;