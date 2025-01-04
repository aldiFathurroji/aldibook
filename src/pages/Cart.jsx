import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from "../Layout/MainLayout";
import Navbar from "../Components/Navbar";
import CheckoutModal from '../Components/CheckoutModal';

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
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
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateQuantity = async (id, quantity) => {
        try {
            await fetch(`http://localhost:5000/api/cart/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ quantity })
            });
            await fetchCartItems();
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const handleRemoveItem = async (id) => {
        if (window.confirm('Are you sure you want to remove this item?')) {
            try {
                await fetch(`http://localhost:5000/api/cart/${id}`, {
                    method: 'DELETE'
                });
                await fetchCartItems();
            } catch (error) {
                console.error('Error removing item:', error);
            }
        }
    };

    return (
        <MainLayout>
            <Navbar />
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6 text-white">Shopping Cart</h1>
                {loading ? (
                    <div className="text-white">Loading...</div>
                ) : cartItems.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-white mb-4">Your cart is empty</p>
                        <Link to="/" className="text-primary-light hover:text-blue-400">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="bg-primary/80 backdrop-blur-md rounded-xl shadow-lg p-6">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex items-center gap-4 py-4 border-b border-gray-700">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-white">{item.title}</h3>
                                    <p className="text-primary-light font-medium">
                                        Rp {item.price.toLocaleString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                                        className="w-20 p-1 border rounded bg-white text-primary-dark"
                                    />
                                    <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="text-red-400 hover:text-red-300 font-medium"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="mt-6 text-right">
                            <p className="text-2xl font-bold text-white">
                                Total: <span className="text-primary-light">Rp {cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}</span>
                            </p>
                            <button 
                                onClick={() => setShowCheckoutModal(true)}
                                className="mt-4 bg-primary-light text-primary-dark px-6 py-2 rounded-full hover:bg-blue-400 font-bold transition-colors"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                )}
                <CheckoutModal
                    isOpen={showCheckoutModal}
                    onClose={() => setShowCheckoutModal(false)}
                    cartItems={cartItems}
                    cartTotal={cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
                />
            </div>
        </MainLayout>
    );
} 