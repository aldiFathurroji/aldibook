import { useState, useEffect } from 'react';
import MainLayout from "../Layout/MainLayout";
import Navbar from "../Components/Navbar";

const API_URL = 'http://localhost:5000/api';

export default function BookManager() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [books, setBooks] = useState([]);
    const [editingBook, setEditingBook] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        category: '',
        price: '',
        rating: '',
        description: '',
        image: ''
    });
    const [activeTab, setActiveTab] = useState('books');
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchBooks();
            fetchCartItems();
        }
    }, [isAuthenticated]);

    const fetchBooks = async () => {
        try {
            const response = await fetch(`${API_URL}/books`);
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const fetchCartItems = async () => {
        try {
            const response = await fetch(`${API_URL}/cart`);
            const data = await response.json();
            setCartItems(data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const handlePinSubmit = (e) => {
        e.preventDefault();
        if (pin === '12345678') {
            setIsAuthenticated(true);
        } else {
            alert('Invalid PIN');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await fetch(`${API_URL}/books/${id}`, {
                    method: 'DELETE'
                });
                await fetchBooks();
            } catch (error) {
                console.error('Error deleting book:', error);
            }
        }
    };

    const handleEdit = (book) => {
        setEditingBook({ ...book });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${API_URL}/books/${editingBook.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editingBook)
            });
            setEditingBook(null);
            await fetchBooks();
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${API_URL}/books?source=normalBook`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newBook)
            });
            setShowAddForm(false);
            setNewBook({
                title: '',
                author: '',
                category: '',
                price: '',
                rating: '',
                description: '',
                image: ''
            });
            await fetchBooks();
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    const handleDeleteCartItem = async (id) => {
        if (window.confirm('Are you sure you want to delete this cart item?')) {
            try {
                await fetch(`${API_URL}/cart/${id}`, {
                    method: 'DELETE'
                });
                await fetchCartItems();
            } catch (error) {
                console.error('Error deleting cart item:', error);
            }
        }
    };

    if (!isAuthenticated) {
        return (
            <MainLayout>
                <Navbar />
                <div className="max-w-md mx-auto mt-20 p-6 bg-slate-700 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 ">Masukan Admin PIN</h2>
                    <form onSubmit={handlePinSubmit}>
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="w-full p-2 border rounded mb-4"
                            placeholder="Masukan PIN"
                        />
                        <button
                            type="masuk"
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        >
                            masuk
                        </button>
                    </form>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setActiveTab('books')}
                            className={`px-4 py-2 rounded ${
                                activeTab === 'books' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        >
                            Manage Books
                        </button>
                        <button
                            onClick={() => setActiveTab('cart')}
                            className={`px-4 py-2 rounded ${
                                activeTab === 'cart' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        >
                            Manage Cart
                        </button>
                        {activeTab === 'books' && (
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Add New Book
                            </button>
                        )}
                    </div>
                </div>

                {activeTab === 'books' ? (
                    <div className="grid gap-6">
                        {books.map(book => (
                            <div key={book.id} className="bg-white p-6 rounded-lg shadow-lg">
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-4">
                                        <img
                                            src={book.image}
                                            alt={book.title}
                                            className="w-24 h-32 object-cover rounded"
                                        />
                                        <div>
                                            <h3 className="text-xl font-bold">{book.title}</h3>
                                            <p className="text-gray-600">{book.author}</p>
                                            <p className="text-gray-600">Category: {book.category}</p>
                                            <p className="text-green-600">Price: Rp {book.price.toLocaleString()}</p>
                                            <p className="text-gray-600">Rating: {book.rating}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(book)}
                                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(book.id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2 text-left">Order ID</th>
                                        <th className="px-4 py-2 text-left">Book</th>
                                        <th className="px-4 py-2 text-left">User ID</th>
                                        <th className="px-4 py-2 text-right">Quantity</th>
                                        <th className="px-4 py-2 text-right">Price</th>
                                        <th className="px-4 py-2 text-right">Total</th>
                                        <th className="px-4 py-2 text-center">Added At</th>
                                        <th className="px-4 py-2 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map(item => (
                                        <tr key={item.id} className="border-b">
                                            <td className="px-4 py-2">{item.id}</td>
                                            <td className="px-4 py-2">
                                                <div className="flex items-center gap-2">
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.title}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                    <div>
                                                        <p className="font-medium">{item.title}</p>
                                                        <p className="text-sm text-gray-500">Book ID: {item.bookId}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2">{item.userId}</td>
                                            <td className="px-4 py-2 text-right">{item.quantity}</td>
                                            <td className="px-4 py-2 text-right">
                                                Rp {item.price.toLocaleString()}
                                            </td>
                                            <td className="px-4 py-2 text-right">
                                                Rp {(item.price * item.quantity).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                {new Date(item.addedAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                <button
                                                    onClick={() => handleDeleteCartItem(item.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr className="bg-gray-50">
                                        <td colSpan="5" className="px-4 py-2 text-right font-semibold">
                                            Total Cart Value:
                                        </td>
                                        <td className="px-4 py-2 text-right font-semibold">
                                            Rp {cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}
                                        </td>
                                        <td colSpan="2"></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                )}

                {/* Edit Modal */}
                {editingBook && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white p-6 rounded-lg w-full max-w-md">
                            <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
                            <form onSubmit={handleSave}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Title</label>
                                        <input
                                            type="text"
                                            value={editingBook.title}
                                            onChange={(e) => setEditingBook({...editingBook, title: e.target.value})}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Author</label>
                                        <input
                                            type="text"
                                            value={editingBook.author}
                                            onChange={(e) => setEditingBook({...editingBook, author: e.target.value})}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Category</label>
                                        <input
                                            type="text"
                                            value={editingBook.category}
                                            onChange={(e) => setEditingBook({...editingBook, category: e.target.value})}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Price</label>
                                        <input
                                            type="number"
                                            value={editingBook.price}
                                            onChange={(e) => setEditingBook({...editingBook, price: Number(e.target.value)})}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Rating</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            value={editingBook.rating}
                                            onChange={(e) => setEditingBook({...editingBook, rating: Number(e.target.value)})}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Description</label>
                                        <textarea
                                            value={editingBook.description}
                                            onChange={(e) => setEditingBook({...editingBook, description: e.target.value})}
                                            className="w-full p-2 border rounded"
                                            rows="3"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                        <input
                                            type="url"
                                            value={editingBook.image}
                                            onChange={(e) => setEditingBook({...editingBook, image: e.target.value})}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setEditingBook(null)}
                                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Add Book Modal */}
                {showAddForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white p-6 rounded-lg w-full max-w-md">
                            <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
                            <form onSubmit={handleAdd}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Title</label>
                                        <input
                                            type="text"
                                            value={newBook.title}
                                            onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                                            className="w-full p-2 border rounded"
                                            required
                                        />
                                    </div>
                                    {/* Similar input fields for other book properties */}
                                    {/* ... */}
                                </div>
                                <div className="flex justify-end gap-2 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddForm(false)}
                                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                    >
                                        Add Book
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
} 