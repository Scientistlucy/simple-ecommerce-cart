import React, { useState } from 'react';
import { 
  ShoppingCartIcon, 
  UserIcon, 
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Link, router } from '@inertiajs/react';
import { useCart } from '@/Contexts/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Get cart count from context
  const { cartCount } = useCart();
  
  // Navigation links
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'Deals', href: '/deals' },
    { name: 'About', href: '/about' },
  ];

  // Handle logout
  const handleLogout = () => {
    router.post(route('logout'));
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Mobile menu button + Logo */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>

            {/* Logo */}
            <Link 
              href="/" 
              className="ml-2 md:ml-0 flex items-center group"
              aria-label="Go to homepage"
            >
              <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                Simple E-Commerce
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:ml-8 md:flex md:space-x-6" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 hover:bg-blue-50 relative group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Center: Search - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-6">
            <div className="relative w-full">
              <div className="relative">
                <MagnifyingGlassIcon 
                  className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${
                    isSearchFocused ? 'text-blue-500' : 'text-gray-400'
                  } transition-colors duration-200`} 
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 transition-all duration-200"
                  aria-label="Search products"
                />
              </div>
            </div>
          </div>

          {/* Right: Cart + User */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Mobile search button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Open search"
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>

            {/* Cart - NOW DYNAMIC */}
            <Link 
              href="/cart" 
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingCartIcon className="h-6 w-6 text-gray-700 hover:text-blue-600 transition-colors duration-200" />
              {cartCount > 0 && (
                <span 
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold min-w-5 h-5 rounded-full flex items-center justify-center px-1 animate-pulse-subtle"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User */}
            <div className="relative group">
              <button
                type="button"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="User account menu"
                aria-haspopup="true"
              >
                <UserIcon className="h-6 w-6 text-gray-700 hover:text-blue-600 transition-colors duration-200" />
              </button>
              
              {/* Dropdown menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 border border-gray-200 z-10">
                <Link
                  href={route('login')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                >
                  Sign In
                </Link>
                <Link
                  href={route('register')}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                >
                  Create Account
                </Link>
                <hr className="my-2 border-gray-200" />
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                >
                  My Profile
                </Link>
                <Link
                  href="/orders"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                >
                  My Orders
                </Link>
                {/* FIXED LOGOUT BUTTON */}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className={`md:hidden pb-4 transition-all duration-300 ${
          isSearchFocused ? 'opacity-100' : 'opacity-0 invisible'
        }`}>
          <div className="relative">
            <MagnifyingGlassIcon 
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" 
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              aria-label="Search products"
            />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 invisible'
        }`}>
          <nav className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-150"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}