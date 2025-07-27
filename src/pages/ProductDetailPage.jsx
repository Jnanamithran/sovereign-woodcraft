import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Zap } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../context/CartContext.jsx';

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

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch product from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setSelectedImage(data.images?.[0] || '');
        setSelectedColor(data.options?.colors?.[0] || '');
        setSelectedSize(data.options?.sizes?.[0] || '');
      } catch (err) {
        console.error(err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      ...product,
      selectedColor,
      selectedSize,
      quantity: 1,
    });
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-600 py-10">{error}</div>;
  if (!product) return null;

  return (
    <div className="bg-gray-50 font-sans">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {/* Images */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto pr-2">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${selectedImage === img ? 'border-amber-500' : 'border-transparent'}`}
                  onClick={() => setSelectedImage(img)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/200x200?text=No+Image';
                  }}
                />
              ))}
            </div>
            <div className="flex-1">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-auto object-cover rounded-xl shadow-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/600x600?text=Image+Not+Found';
                }}
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-md text-gray-500 mt-1">By {product.brand}</p>

            <div className="my-4">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} />
            </div>

            <p className="text-3xl font-extrabold text-gray-900 mb-4">${product.price.toFixed(2)}</p>
            <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

            {/* Color & Size Options */}
            <div className="space-y-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Color: <span className="font-bold">{selectedColor}</span>
                </h3>
                <div className="flex items-center space-x-2">
                  {product.options?.colors?.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`h-8 w-8 rounded-full border-2 ${selectedColor === color ? 'border-amber-500 ring-2 ring-amber-300' : 'border-gray-200'}`}
                      style={{ backgroundColor: color.toLowerCase().replace(' ', '') }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Size: <span className="font-bold">{selectedSize}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.options?.sizes?.map((size) => (
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

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-amber-700 text-white font-semibold rounded-lg shadow-md hover:bg-amber-800 transition-all duration-300 transform hover:scale-105"
              >
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
      </div>
    </div>
  );
};

export default ProductDetailPage;
