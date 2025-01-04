import { useSearchParams } from 'react-router-dom';
import MainLayout from "../Layout/MainLayout";
import Navbar from "../Components/Navbar";
import normalBook from "../data/normalBook.json";
import books from "../data/book.json";

export default function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q')?.toLowerCase() || '';

    // Gabungkan buku dari kedua sumber dan hilangkan duplikat berdasarkan ID
    const allBooks = [...books, ...normalBook];
    const uniqueBooks = allBooks.filter((book, index, self) =>
        index === self.findIndex((b) => b.id === book.id)
    );

    // Filter buku berdasarkan query
    const searchResults = uniqueBooks.filter(book => 
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)
    );

    return (
        <MainLayout>
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">
                    Search Results for "{query}"
                </h1>
                
                {searchResults.length === 0 ? (
                    <div className="text-center text-gray-600 py-12">
                        <h2 className="text-2xl font-semibold mb-4">No books found</h2>
                        <p>Try searching with different keywords</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                        {searchResults.map((book) => (
                            <div
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
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </MainLayout>
    );
} 