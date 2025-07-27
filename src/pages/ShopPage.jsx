import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard'; // Assuming ProductCard is in this path
import { Filter, X } from 'lucide-react';

// --- MOCK DATA FOR THE SHOP ---
// In a real app, you'd fetch this from your API
const allProducts = [
  { id: 1, name: 'Handcrafted Oak Chair', price: 180.00, category: 'Chairs', imageUrl: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80' },
  { id: 2, name: 'Artisan Walnut Table', price: 750.00, category: 'Tables', imageUrl: 'https://images.unsplash.com/photo-1604074131665-7a5d83a54e35?auto=format&fit=crop&q=80' },
  { id: 3, name: 'Minimalist Pine Shelf', price: 95.00, category: 'Shelving', imageUrl: 'https://images.unsplash.com/photo-1594894489684-9e05c6d3e1fd?auto=format&fit=crop&q=80' },
  { id: 4, name: 'Rustic Wooden Stool', price: 75.00, category: 'Chairs', imageUrl: 'https://images.unsplash.com/photo-1573070476230-952a2f862744?auto=format&fit=crop&q=80' },
  { id: 5, name: 'Modern Cedar Desk', price: 450.00, category: 'Tables', imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f82d7a?auto=format&fit=crop&q=80' },
  { id: 6, name: 'Floating Oak Shelves', price: 120.00, category: 'Shelving', imageUrl: 'https://images.unsplash.com/photo-1600375992853-3b67958b21d7?auto=format&fit=crop&q=80' },
  { id: 7, name: 'Leather & Oak Lounge Chair', price: 320.00, category: 'Chairs', imageUrl: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80' },
  { id: 8, name: 'Large Farmhouse Dining Table', price: 980.00, category: 'Tables', imageUrl: 'https://images.unsplash.com/photo-1511203381168-a45483b4a243?auto=format&fit=crop&q=80' },
];

const categories = ['All', 'Chairs', 'Tables', 'Shelving'];
const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

const ShopPage = () => {
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // useMemo ensures this complex logic only runs when its dependencies change
  const filteredAndSortedProducts = useMemo(() => {
    let products = [...allProducts];

    // Filtering logic
    if (filterCategory !== 'All') {
      products = products.filter(p => p.category === filterCategory);
    }

    // Sorting logic
    if (sortOrder === 'price-asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      products.sort((a, b) => b.price - a.price);
    }
    
    return products;
  }, [filterCategory, sortOrder]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Our Collection</h1>
        <p className="text-lg text-gray-600 mt-2">Explore our handcrafted furniture, designed to last a lifetime.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* --- MOBILE FILTER BUTTON --- */}
        <div className="lg:hidden flex justify-between items-center">
            <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="flex items-center gap-2 bg-amber-700 text-white px-4 py-2 rounded-md hover:bg-amber-800"
            >
                <Filter size={20} />
                <span>Filters</span>
            </button>
            {/* Mobile Sort Dropdown */}
            <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2"
            >
                {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>

        {/* --- FILTER SIDEBAR --- */}
        <aside className={`
            lg:w-1/4 lg:block
            ${isSidebarOpen ? 'block' : 'hidden'}
            fixed lg:relative top-0 left-0 w-3/4 h-full bg-white z-20 p-6 lg:p-0 shadow-lg lg:shadow-none transition-transform
        `}>
            <div className="flex justify-between items-center lg:hidden mb-6">
                <h3 className="text-xl font-bold">Filters</h3>
                <button onClick={() => setIsSidebarOpen(false)}><X size={24} /></button>
            </div>
          
            {/* Category Filter */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                        setFilterCategory(category);
                        setIsSidebarOpen(false); // Close sidebar on mobile after selection
                    }}
                    className={`
                      w-full text-left px-3 py-2 rounded-md transition-colors
                      ${filterCategory === category ? 'bg-amber-100 text-amber-800 font-bold' : 'text-gray-600 hover:bg-gray-100'}
                    `}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
        </aside>

        {/* --- PRODUCTS GRID --- */}
        <main className="w-full lg:w-3/4">
            {/* Desktop Sort Dropdown */}
            <div className="hidden lg:flex justify-end mb-4">
                <select 
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2"
                >
                    {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredAndSortedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {filteredAndSortedProducts.length === 0 && (
                <div className="text-center py-20">
                    <h3 className="text-2xl font-semibold text-gray-700">No Products Found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
                </div>
            )}
        </main>
      </div>
    </div>
  );
};

export default ShopPage;