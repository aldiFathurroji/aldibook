import React from "react";
import { Link } from "react-router-dom";

const Banner = ({ books }) => {
  return (
    <div className="carousel w-full max-w-7xl mx-auto my-8">
      {books.map((book) => (
        <div
          key={book.id}
          className="carousel-item w-full min-h-[400px] bg-white rounded-lg shadow-lg overflow-hidden">
          <Link to={`/detail/${book.id}`} className="flex gap-8 items-center p-8">
            <img
              src={book.image}
              alt={book.title}
              className="h-80 w-64 object-cover rounded-lg shadow-md"
            />
            <div className="flex flex-col gap-4 flex-1">
              <h2 className="text-4xl font-bold text-gray-800">{book.title}</h2>
              <p className="text-xl text-gray-600">by {book.author}</p>
              <p className="text-gray-700 text-lg leading-relaxed">{book.description}</p>
              <p className="text-2xl font-semibold text-green-600">Rp {book.price.toLocaleString()}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Banner;