import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx'; // Correct import with .jsx
import { ShoppingBag, Check } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    // Revert the button state after a short delay
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden group flex flex-col">
      {/* ... other product card code ... */}
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
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