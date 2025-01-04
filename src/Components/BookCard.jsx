import { motion } from 'framer-motion';

export default function BookCard({ book }) {
    return (
        <div className="flex justify-center items-center ">
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-md rounded-lg shadow-xl overflow-hidden transform transition-all hover:shadow-2xl w-full max-w-sm"
            >
                <div className="relative pb-48">
                    <img
                        src={book.image}
                        alt={book.title}
                        className="absolute h-full w-full object-cover transition-transform hover:scale-110"
                    />
                </div>
                <div className="p-4 bg-gradient-to-b from-primary/80 to-primary-dark/90 text-white">
                    <h3 className="text-lg font-semibold mb-2 text-primary-light">{book.title}</h3>
                    <p className="text-gray-300 mb-2">{book.author}</p>
                    <div className="flex justify-between items-center">
                        <span className="text-primary-light font-bold">
                            Rp {book.price.toLocaleString()}
                        </span>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-primary-light text-primary-dark px-4 py-2 rounded-full hover:bg-blue-400 transition-colors font-semibold"
                        >
                            Add to Cart
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
} 