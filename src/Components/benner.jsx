import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Banner = () => {
  const [books, setBooks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    const bookData = require('../data/book.json');
    setBooks(bookData);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === books.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [books.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold && currentIndex < books.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (info.offset.x > swipeThreshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (books.length === 0) {
    return <div className="text-white text-center py-8">Loading...</div>;
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto my-8 px-4">
      {/* Main Carousel */}
      <div className="overflow-hidden rounded-xl shadow-2xl">
        <motion.div 
          className="flex cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
        >
          <AnimatePresence initial={false}>
            <motion.div
              className="flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {books.map((book) => (
                <motion.div
                  key={book.id}
                  className="w-full flex-shrink-0 bg-gradient-to-r from-primary-dark to-primary"
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    to={`/detail/${book.id}`} 
                    className="flex flex-col md:flex-row gap-8 items-center p-8 h-[500px]"
                  >
                    {/* Image Container */}
                    <div className="w-full md:w-1/3 flex justify-center">
                      <motion.img
                        src={book.image}
                        alt={book.title}
                        className="h-[300px] w-[200px] object-cover rounded-lg shadow-xl"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    {/* Content Container */}
                    <div className="w-full md:w-2/3 flex flex-col gap-4 text-center md:text-left">
                      <h2 className="text-3xl md:text-4xl font-bold text-white">
                        {book.title}
                      </h2>
                      <p className="text-xl text-white font-medium">
                        by {book.author}
                      </p>
                      <p className="text-gray-200 text-base md:text-lg leading-relaxed line-clamp-3">
                        {book.description}
                      </p>
                      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mt-4">
                        <p className="text-2xl font-bold text-primary-light">
                          Rp {book.price.toLocaleString()}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-primary-light text-primary-dark px-6 py-2 rounded-full hover:bg-blue-400 transition-colors font-bold"
                        >
                          View Details
                        </motion.button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {books.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "bg-primary-light w-6" 
                : "bg-gray-400 hover:bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => goToSlide(currentIndex === 0 ? books.length - 1 : currentIndex - 1)}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-4 rounded-r-lg hover:bg-black/70 transition-colors"
        aria-label="Previous slide"
      >
        ←
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => goToSlide(currentIndex === books.length - 1 ? 0 : currentIndex + 1)}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-4 rounded-l-lg hover:bg-black/70 transition-colors"
        aria-label="Next slide"
      >
        →
      </motion.button>
    </div>
  );
};

export default Banner;