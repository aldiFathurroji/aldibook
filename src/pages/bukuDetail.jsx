import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Navbar from "../Components/Navbar";
import normalBook from "../data/normalBook.json";
import books from "../data/book.json";
import { useState } from "react";

export default function BukuDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [pin, setPin] = useState("");
    const [showPinModal, setShowPinModal] = useState(false);
    const [editedBook, setEditedBook] = useState(null);
    const [addingToCart, setAddingToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const book = normalBook.find(b => b.id === parseInt(id)) ||
        books.find(b => b.id === parseInt(id));

    if (!book) return (
        <MainLayout>
            <Navbar />
            <div className="flex items-center justify-center h-screen">
                <div className="text-2xl text-gray-600">Book not found</div>
            </div>
        </MainLayout>
    );

    const handleEdit = () => {
        setShowPinModal(true);
    };

    const handlePinSubmit = (e) => {
        e.preventDefault();
        if (pin === "12345678") {
            setShowPinModal(false);
            setIsEditing(true);
            setEditedBook({ ...book });
        } else {
            alert("Invalid PIN");
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/books/${book.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editedBook)
            });

            if (response.ok) {
                setIsEditing(false);
                // Refresh halaman untuk menampilkan data terbaru
                window.location.reload();
            } else {
                throw new Error('Failed to update book');
            }
        } catch (error) {
            console.error('Error updating book:', error);
            alert('Failed to update book');
        }
    };

    const handleAddToCart = async () => {
        try {
            setAddingToCart(true);
            const cartItem = {
                bookId: book.id,
                quantity: quantity,
                price: book.price,
                title: book.title,
                image: book.image
            };

            const response = await fetch('http://localhost:5000/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            });

            if (response.ok) {
                alert('Book added to cart successfully!');
            } else {
                throw new Error('Failed to add to cart');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add to cart');
        } finally {
            setAddingToCart(false);
        }
    };

    return (
        <MainLayout>
            <Navbar />
            <div className="max-w-7xl mx-auto p-6 min-h-screen">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="md:w-1/3">
                            <div className="sticky top-24">
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="w-full rounded-lg shadow-lg"
                                />
                                <div className="mt-6 space-y-4">
                                    <p className="text-3xl font-bold text-green-600">
                                        Rp {book.price.toLocaleString()}
                                    </p>
                                    <div className="flex items-center gap-2 mb-4">
                                        <label className="text-sm font-medium text-gray-700">
                                            Quantity:
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                                            className="w-20 p-1 border rounded"
                                        />
                                    </div>
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={addingToCart}
                                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-400"
                                    >
                                        {addingToCart ? 'Adding...' : 'Add to Cart'}
                                    </button>
                                    <button
                                        onClick={handleEdit}
                                        className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors duration-300"
                                    >
                                        Edit Book Details
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-2/3">
                            {isEditing ? (
                                <form onSubmit={handleSave} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Title</label>
                                            <input
                                                type="text"
                                                value={editedBook.title}
                                                onChange={(e) => setEditedBook({...editedBook, title: e.target.value})}
                                                className="w-full p-2 border rounded"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Author</label>
                                            <input
                                                type="text"
                                                value={editedBook.author}
                                                onChange={(e) => setEditedBook({...editedBook, author: e.target.value})}
                                                className="w-full p-2 border rounded"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Category</label>
                                            <input
                                                type="text"
                                                value={editedBook.category}
                                                onChange={(e) => setEditedBook({...editedBook, category: e.target.value})}
                                                className="w-full p-2 border rounded"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Price</label>
                                            <input
                                                type="number"
                                                value={editedBook.price}
                                                onChange={(e) => setEditedBook({...editedBook, price: parseInt(e.target.value)})}
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
                                                value={editedBook.rating}
                                                onChange={(e) => setEditedBook({...editedBook, rating: parseFloat(e.target.value)})}
                                                className="w-full p-2 border rounded"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Pages</label>
                                            <input
                                                type="number"
                                                value={editedBook.pages}
                                                onChange={(e) => setEditedBook({...editedBook, pages: parseInt(e.target.value)})}
                                                className="w-full p-2 border rounded"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Language</label>
                                            <input
                                                type="text"
                                                value={editedBook.language}
                                                onChange={(e) => setEditedBook({...editedBook, language: e.target.value})}
                                                className="w-full p-2 border rounded"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Publisher</label>
                                            <input
                                                type="text"
                                                value={editedBook.publisher}
                                                onChange={(e) => setEditedBook({...editedBook, publisher: e.target.value})}
                                                className="w-full p-2 border rounded"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">ISBN</label>
                                            <input
                                                type="text"
                                                value={editedBook.isbn}
                                                onChange={(e) => setEditedBook({...editedBook, isbn: e.target.value})}
                                                className="w-full p-2 border rounded"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                            <input
                                                type="url"
                                                value={editedBook.image}
                                                onChange={(e) => setEditedBook({...editedBook, image: e.target.value})}
                                                className="w-full p-2 border rounded"
                                                required
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">Description</label>
                                            <textarea
                                                value={editedBook.description}
                                                onChange={(e) => setEditedBook({...editedBook, description: e.target.value})}
                                                className="w-full p-2 border rounded"
                                                rows="4"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
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
                            ) : (
                                <>
                                    <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
                                    <p className="text-xl text-gray-600 mb-4">By {book.author}</p>
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="px-4 py-1 bg-gray-100 rounded-full text-gray-600">
                                            {book.category}
                                        </span>
                                        <div className="flex items-center">
                                            <span className="text-yellow-400 text-xl">★</span>
                                            <span className="ml-1 text-gray-600">{book.rating}/5</span>
                                        </div>
                                    </div>
                                    <div className="prose max-w-none">
                                        <h2 className="text-2xl font-bold mb-4">Description</h2>
                                        <p className="text-gray-700 leading-relaxed">
                                            {book.description}
                                        </p>
                                    </div>
                                    <div className="mt-8">
                                        <h2 className="text-2xl font-bold mb-4">Book Details</h2>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-gray-600">Pages</p>
                                                <p className="font-semibold">{book.pages || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Language</p>
                                                <p className="font-semibold">{book.language || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">Publisher</p>
                                                <p className="font-semibold">{book.publisher || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-600">ISBN</p>
                                                <p className="font-semibold">{book.isbn || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* PIN Modal */}
            {showPinModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Enter PIN</h2>
                        <form onSubmit={handlePinSubmit}>
                            <input
                                type="password"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                className="w-full p-2 border rounded mb-4"
                                placeholder="Enter PIN"
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowPinModal(false)}
                                    className="px-4 py-2 bg-gray-200 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}