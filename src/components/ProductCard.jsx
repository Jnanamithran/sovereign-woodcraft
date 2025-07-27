import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { ShoppingBag, Check } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const imageSrc = product.imageUrl || product.image || '';
  const title = product.name || product.title || 'Unnamed Product';
  const price = typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price;

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow flex flex-col">
      {/* Image + Overlay View Details Link */}
      <Link to={`/product/${product._id}`} className="relative block">
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
          <span className="bg-amber-700 text-white py-2 px-6 rounded-full transform hover:scale-105 transition-transform">
            View Details
          </span>
        </div>
      </Link>

      {/* Info & Add to Cart */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-1">{price}</p>

        <div className="mt-auto pt-4">
          <button
            onClick={handleAddToCart}
            disabled={added}
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all duration-300 ${
              added
                ? 'bg-green-600 text-white'
                : 'bg-amber-700 text-white hover:bg-amber-800'
            }`}
          >
            {added ? (
              <>
                <Check size={20} />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag size={20} />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
