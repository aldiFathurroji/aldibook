// Import React and necessary dependencies
import React from "react";



// Define the Banner component
const CardBook = ({ normalBook }) => {
  return (
    <div className="flex w-full justify-center items-start  gap-2 bg-slate-400 flex-wrap ">
        {normalBook.map((normalBook) => (
          <div
            key={normalBook.id}
            className="flex  gap-2 items-start bg-white rounded-md w-[450px]">
                <img
                    src={normalBook.image}></img>
                    <div className="flex flex-col">
                        <p>{normalBook.title}</p>
                        <p>{normalBook.author}</p>
                        <p>{normalBook.price}</p>
                    </div>
          </div>
        ))}
      </div>  );
};

export default CardBook;
