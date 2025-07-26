// /frontend/src/pages/HomePage.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';

// --- Mock Data for Products ---
// In a real application, you would fetch this data from your backend API
const featuredProducts = [
  {
    id: 1,
    name: 'Handcrafted Oak Chair',
    price: '$180.00',
    imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Artisan Walnut Table',
    price: '$750.00',
    imageUrl: 'https://images.unsplash.com/photo-1604074131665-7a5d83a54e35?auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Minimalist Pine Shelf',
    price: '$95.00',
    imageUrl: 'https://images.unsplash.com/photo-1594894489684-9e05c6d3e1fd?auto=format&fit=crop&q=80',
  },
    {
    id: 4,
    name: 'Rustic Wooden Stool',
    price: '$75.00',
    imageUrl: 'https://images.unsplash.com/photo-1573070476230-952a2f862744?auto=format&fit=crop&q=80',
  },
];


// --- Reusable Components ---

const Header = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-amber-800">
          Sovereign Woodcraft
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-amber-600">Home</Link>
          <Link to="/shop" className="text-gray-700 hover:text-amber-600">Shop</Link>
          <Link to="/about" className="text-gray-700 hover:text-amber-600">About</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="text-gray-700 hover:text-amber-600">
            <ShoppingCart size={24} />
          </button>
          {userInfo ? (
            <div className="flex items-center space-x-2">
              <span className="hidden sm:inline text-gray-700">Hi, {userInfo.name.split(' ')[0]}</span>
              <button onClick={logoutHandler} className="text-gray-700 hover:text-amber-600">
                <LogOut size={24} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center text-gray-700 hover:text-amber-600">
              <User size={24} />
              <span className="ml-2 hidden sm:inline">Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

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

const Footer = () => (
    <footer className="bg-gray-800 text-white mt-16">
        <div className="container mx-auto px-6 py-8 text-center">
            <p>&copy; {new Date().getFullYear()} Sovereign Woodcraft. All Rights Reserved.</p>
        </div>
    </footer>
);


// --- Main HomePage Component ---

const HomePage = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section 
          className="relative h-[60vh] bg-cover bg-center flex items-center justify-center text-white"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80')" }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative text-center z-10 px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Timeless Furniture, Handcrafted for You</h1>
            <p className="text-lg md:text-xl mb-8">Discover pieces that tell a story.</p>
            <button className="bg-amber-700 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-amber-800 transition duration-300">
              Explore Our Collection
            </button>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
