import React, { useState } from 'react';
import { Star, ShoppingCart, Zap } from 'lucide-react';

// --- Mock Data ---
// In a real application, you would fetch this data from an API based on the product ID from the URL.
const product = {
  name: 'Classic Leather Moto Jacket',
  brand: 'Urban Riders',
  price: 249.99,
  rating: 4.5,
  reviewCount: 117,
  description: 'Experience timeless style with our Classic Leather Moto Jacket. Crafted from 100% genuine lambskin leather, this jacket offers a sleek, tailored fit that is perfect for any occasion. Features include a durable front zipper, multiple pockets for functionality, and a quilted lining for added warmth and comfort.',
  images: [
    'https://placehold.co/600x600/212121/white?text=Main+Jacket',
    'https://placehold.co/600x600/424242/white?text=Jacket+Side',
    'https://placehold.co/600x600/616161/white?text=Jacket+Back',
    'https://placehold.co/600x600/757575/white?text=Jacket+Detail',
  ],
  options: {
    colors: ['Black', 'Brown', 'Dark Navy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
};

const reviews = [
  {
    id: 1,
    author: 'Alex Morgan',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Absolutely love this jacket! The leather is so soft and it fits perfectly. It feels and looks much more expensive than it is. Highly recommended!',
  },
  {
    id: 2,
    author: 'Jordan Lee',
    rating: 4,
    date: '1 month ago',
    comment: 'Great jacket overall. Stylish and comfortable. I took off one star because the zipper can be a bit stiff at times, but it\'s getting better with use.',
  },
  {
    id: 3,
    author: 'Casey Smith',
    rating: 5,
    date: '3 months ago',
    comment: 'Perfect moto jacket. I\'ve been looking for one like this for ages. The quality is top-notch and it gets compliments everywhere I go.',
  },
];

// --- Helper Components ---

// Star Rating Component
const StarRating = ({ rating, reviewCount }) => (
  <div className="flex items-center space-x-2">
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${rating > i ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
        />
      ))}
    </div>
    {reviewCount && (
      <span className="text-sm text-gray-500">{reviewCount} reviews</span>
    )}
  </div>
);

// --- Main Product Detail Component ---
const ProductDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.options.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.options.sizes[2]);

  return (
    <div className="bg-gray-50 font-sans">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* --- Main Product Section --- */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {/* Image Gallery */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto pr-2">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer flex-shrink-0 border-2 ${selectedImage === img ? 'border-amber-500' : 'border-transparent'}`}
                  onClick={() => setSelectedImage(img)}
                  onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/200x200/cccccc/ffffff?text=Error'; }}
                />
              ))}
            </div>
            <div className="flex-1">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-auto object-cover rounded-xl shadow-lg"
                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x600/cccccc/ffffff?text=Image+Not+Found'; }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-md text-gray-500 mt-1">By {product.brand}</p>

            <div className="my-4">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} />
            </div>

            <p className="text-3xl font-extrabold text-gray-900 mb-4">${product.price.toFixed(2)}</p>

            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            {/* Options */}
            <div className="space-y-4 mb-6">
              {/* Color Options */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Color: <span className="font-bold">{selectedColor}</span></h3>
                <div className="flex items-center space-x-2">
                  {product.options.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`h-8 w-8 rounded-full border-2 transition-transform transform hover:scale-110 ${selectedColor === color ? 'border-amber-500 ring-2 ring-amber-300' : 'border-gray-200'}`}
                      style={{ backgroundColor: color.toLowerCase().replace(' ', '') }}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
              </div>

              {/* Size Options */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Size: <span className="font-bold">{selectedSize}</span></h3>
                <div className="flex flex-wrap gap-2">
                  {product.options.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${selectedSize === size ? 'bg-amber-700 text-white border-amber-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-amber-700 text-white font-semibold rounded-lg shadow-md hover:bg-amber-800 transition-all duration-300 transform hover:scale-105">
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
                <Zap className="h-5 w-5" />
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* --- Reviews Section --- */}
        <div className="mt-16 lg:mt-24">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
          <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
            {reviews.map((review, index) => (
              <div key={review.id} className={`py-6 ${index < reviews.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <img className="h-12 w-12 rounded-full object-cover" src={`https://i.pravatar.cc/48?u=${review.author}`} alt={review.author} />
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center justify-between w-full">
                       <p className="text-md font-semibold text-gray-900">{review.author}</p>
                       <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <div className="mt-1">
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="mt-3 text-gray-600">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-6 text-center">
                <a href="#" className="text-amber-600 font-semibold hover:text-amber-500">
                    Read all {product.reviewCount} reviews
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
