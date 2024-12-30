// Import React and necessary dependencies
import React from "react";



// Define the Banner component
const Banner = ({ books }) => {
  return (
    <div className="carousel w-full  bg-red-300  ">
        {books.map((book) => (
          <div
            key={book.id}
            className=" carousel-item w-full min-h-[300px] bg-slate-50  ">
            <div className="flex gap-2 items-center">
                <img
                    src={book.image}
                    alt={book.title}
                    className=" h-72 object-cover"
                />
                <div className="flex flex-col gap-2 items-start ">
                    <p className="text-3xl" >{book.title}</p>
                    <p>{book.author}</p>
                    <p>{book.description}</p>
                    
                </div>
            </div>
          </div>
        ))}
      </div>  );
};

export default Banner;
