import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from "../Layout/MainLayout";
import Navbar from "../Components/Navbar";
import normalBook from "../data/normalBook.json";
import books from "../data/book.json";

export default function Categories() {
    const [selectedGenre, setSelectedGenre] = useState('all');

    // Gabungkan buku dari kedua sumber dan hilangkan duplikat
    const allBooks = [...books, ...normalBook];
    const uniqueBooks = allBooks.filter((book, index, self) =>
        index === self.findIndex((b) => b.id === book.id)
    );

    // Dapatkan genre unik dari semua buku
    const genres = ['all', ...new Set(uniqueBooks.map(book => book.category))];

    // Filter buku berdasarkan genre yang dipilih
    const filteredBooks = selectedGenre === 'all' 
        ? uniqueBooks 
        : uniqueBooks.filter(book => book.category === selectedGenre);

    return (
        <MainLayout>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Book Categories</h1>
                
                <div className="flex flex-wrap gap-4 mb-8">
                    {genres.map(genre => (
                        <button
                            key={genre}
                            onClick={() => setSelectedGenre(genre)}
                            className={`px-4 py-2 rounded-full ${
                                selectedGenre === genre
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        >
                            {genre.charAt(0).toUpperCase() + genre.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBooks.map((book) => (
                        <Link
                            to={`/detail/${book.id}`}
                            key={book.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                            <img
                                src={book.image}
                                alt={book.title}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h3>
                                <p className="text-gray-600 mb-2">{book.author}</p>
                                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                                    {book.category}
                                </span>
                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-green-600 font-semibold">
                                        Rp {book.price.toLocaleString()}
                                    </span>
                                    <div className="flex items-center">
                                        <span className="text-yellow-400">★</span>
                                        <span className="ml-1 text-gray-600">{book.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}