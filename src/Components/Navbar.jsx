import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutModal from './CheckoutModal';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart');
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <div className="navbar bg-primary shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex justify-between items-center py-4">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center"
          >
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-slate-700 rounded-box shadow-lg mt-3 w-52">
                <li><Link to="/" className="py-2">Homepage</Link></li>
                <li><Link to="/categories" className="py-2">Categories</Link></li>
                <li>
                  <a className="py-2" onClick={() => setShowContact(true)}>Contact</a>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl font-bold text-primary-light hover:text-primary transition-colors"
          >
            <Link to="/">Aldibook</Link>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-4"
          >
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </form>

            <div className="relative">
              <button
                onClick={() => setShowCartDropdown(!showCartDropdown)}
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {cartItems.length > 0 && (
                    <span className="badge badge-sm indicator-item bg-red-500 text-white">
                      {cartItems.length}
                    </span>
                  )}
                </div>
              </button>

              {showCartDropdown && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-700 rounded-lg shadow-xl z-50">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-3">Shopping Cart</h3>
                    {cartItems.length === 0 ? (
                      <p className="text-gray-500">Your cart is empty</p>
                    ) : (
                      <>
                        <div className="max-h-64 overflow-y-auto">
                          {cartItems.map(item => (
                            <div key={item.id} className="flex items-center gap-3 py-2 border-b">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="text-sm font-medium">{item.title}</h4>
                                <div className="text-sm text-gray-500">
                                  {item.quantity} × Rp {item.price.toLocaleString()}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t">
                          <div className="flex justify-between font-semibold">
                            <span>Total:</span>
                            <span>Rp {cartTotal.toLocaleString()}</span>
                          </div>
                          <div className="flex flex-col gap-2 mt-4">
                            <Link 
                              to="/cart"
                              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-center block hover:bg-blue-700"
                              onClick={() => setShowCartDropdown(false)}
                            >
                              View Cart
                            </Link>
                            <button
                              onClick={() => {
                                setShowCartDropdown(false);
                                setShowCheckoutModal(true);
                              }}
                              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg text-center hover:bg-green-700"
                            >
                              Checkout
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            <Link
              to="/manage-books"
              className="btn btn-ghost btn-circle"
              title="Manage Books"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-700 p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <p><strong>Email:</strong> aldibook@gmail.com</p>
              <p><strong>Phone:</strong> +62 812 1844 3652</p>
              <p><strong>Address:</strong> pandeglang, banten</p>
              <div className="flex gap-4">
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a>
                <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
              </div>
            </div>
            <button
              className="mt-6 w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700"
              onClick={() => setShowContact(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        cartItems={cartItems}
        cartTotal={cartTotal}
      />
    </div>
  );
}