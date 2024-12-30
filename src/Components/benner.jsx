import React from "react";
import { Link } from "react-router-dom";

const Banner = ({ books }) => {
  return (
    <div className="carousel w-full bg-red-300">
      {books.map((book) => (
        <div
          key={book.id}
          className="carousel-item w-full min-h-[300px] bg-slate-50">
          <Link to={`/detail/${book.id}`} className="flex gap-2 items-center">
            <img
              src={book.image}
              alt={book.title}
              className="h-72 object-cover"
            />
            <div className="flex flex-col gap-2 items-start">
              <p className="text-3xl">{book.title}</p>
              <p>{book.author}</p>
              <p>{book.description}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Banner;