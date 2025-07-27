import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Search } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const { cartCount } = useCart();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery('');
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
    window.location.reload(); 
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        
        <Link to="/" className="flex items-center space-x-2">
          <svg className="h-10 w-10 text-amber-800" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 7L12 12M22 7L12 12M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 4.5L7 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="text-2xl font-bold text-amber-800 hidden sm:inline">Sovereign Woodcraft</span>
        </Link>

        <nav className="hidden lg:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-amber-600">Home</Link>
          <Link to="/shop" className="text-gray-700 hover:text-amber-600">Shop</Link>
          <Link to="/about" className="text-gray-700 hover:text-amber-600">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-amber-600">Contact</Link> {/* <-- ADD CONTACT LINK */}
        </nav>

        <div className="flex items-center space-x-3 sm:space-x-4">
          
          <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
             <input type="search" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="py-2 pl-4 pr-10 w-40 lg:w-56 rounded-full border border-gray-300 bg-gray-100/50 focus:outline-none focus:ring-2 focus:ring-amber-500"/>
            <button type="submit" className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Search className="h-5 w-5 text-gray-400 hover:text-amber-700" />
            </button>
          </form>
          
          <Link to="/cart" className="relative text-gray-700 hover:text-amber-600 p-2 rounded-full hover:bg-gray-100">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 block h-5 w-5 transform -translate-y-1/2 translate-x-1/2 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">{cartCount}</span>
            )}
          </Link>
          
          {userInfo ? (
            <div className="flex items-center space-x-2">
              <span className="hidden sm:inline text-gray-700">Hi, {userInfo.name.split(' ')[0]}</span>
              <button onClick={logoutHandler} className="text-gray-700 hover:text-amber-600 p-2 rounded-full hover:bg-gray-100" title="Logout"><LogOut size={24} /></button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center text-gray-700 hover:text-amber-600"><User size={24} /><span className="ml-2 hidden sm:inline">Login</span></Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
