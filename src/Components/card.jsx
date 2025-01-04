// Import React and necessary dependencies
import React from "react";
import { Link } from "react-router-dom";



// Define the Banner component
const CardBook = ({ normalBook }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-primary-light mb-8">All Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {normalBook.map((book) => (
          <Link 
            to={`/detail/${book.id}`} 
            key={book.id}
            className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"/>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h3>
              <p className="text-gray-600 mb-2">{book.author}</p>
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
  );
};

export default CardBook;
