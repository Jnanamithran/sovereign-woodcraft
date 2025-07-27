import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Search } from 'lucide-react'; // Added Search icon

const Header = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
    window.location.reload(); 
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        
        {/* ## LOGO & BRAND NAME ## */}
        <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
          {/* Simple SVG logo representing woodcraft */}
          <svg className="h-10 w-10 text-amber-800" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 7L12 12M22 7L12 12M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17 4.5L7 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-2xl font-bold text-amber-800 hidden sm:inline">
            Sovereign Woodcraft
          </span>
        </Link>

        {/* ## NAVIGATION LINKS ## */}
        {/* Placed in the middle for better spacing on larger screens */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-amber-600">Home</Link>
          <Link to="/shop" className="text-gray-700 hover:text-amber-600">Shop</Link>
          <Link to="/about" className="text-gray-700 hover:text-amber-600">About</Link>
        </nav>

        {/* ## SEARCH, CART & USER ## */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* ## SEARCH BAR ## */}
          <div className="relative hidden md:block">
             <input 
              type="search" 
              placeholder="Search..."
              className="py-2 px-4 w-40 lg:w-56 rounded-full border border-gray-300 bg-gray-100/50 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {/* ## CART ICON ## */}
          <button className="text-gray-700 hover:text-amber-600 p-2 rounded-full hover:bg-gray-100">
            <ShoppingCart size={24} />
          </button>
          
          {/* ## USER INFO / LOGIN ## */}
          {userInfo ? (
            <div className="flex items-center space-x-2">
              <span className="hidden sm:inline text-gray-700">Hi, {userInfo.name.split(' ')[0]}</span>
              <button onClick={logoutHandler} className="text-gray-700 hover:text-amber-600 p-2 rounded-full hover:bg-gray-100" title="Logout">
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

export default Header;