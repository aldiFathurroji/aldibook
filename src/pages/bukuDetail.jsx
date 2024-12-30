import { useParams } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Navbar from "../Components/Navbar";
import normalBook from "../data/book.json";
import books from "../data/normalBook.json";

export default function BukuDetail() {
    const { id } = useParams();

    // Search in both JSON files
    const book = normalBook.find(b => b.id === parseInt(id)) ||
        books.find(b => b.id === parseInt(id));

    if (!book) return <div>Book not found</div>;

    return (
        <MainLayout>
            <Navbar />
            <div className="container mx-auto p-4">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3">
                        <img
                            src={book.image}
                            alt={book.title}
                            className="w-full rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="md:w-2/3">
                        <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
                        <p className="text-xl mb-2">By {book.author}</p>
                        <p className="text-gray-600 mb-2">Category: {book.category}</p>
                        <div className="flex items-center mb-2">
                            <span className="text-yellow-500">★</span>
                            <span className="ml-1">{book.rating}/5</span>
                        </div>
                        <p className="text-2xl font-bold text-green-600 mb-4">
                            Rp {book.price}
                        </p>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h2 className="text-xl font-bold mb-2">Description</h2>
                            <p className="text-gray-700">{book.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}