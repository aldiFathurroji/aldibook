const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Path ke file JSON
const bookPath = path.join(__dirname, '../src/data/book.json');
const normalBookPath = path.join(__dirname, '../src/data/normalBook.json');
const cartPath = path.join(__dirname, '../src/data/cart.json');

// GET semua buku
app.get('/api/books', async (req, res) => {
    try {
        const [books, normalBooks] = await Promise.all([
            fs.readFile(bookPath, 'utf8'),
            fs.readFile(normalBookPath, 'utf8')
        ]);
        
        const allBooks = [
            ...JSON.parse(books),
            ...JSON.parse(normalBooks)
        ];
        
        res.json(allBooks);
    } catch (error) {
        res.status(500).json({ error: 'Error reading books' });
    }
});

// POST buku baru
app.post('/api/books', async (req, res) => {
    try {
        const newBook = req.body;
        const { source } = req.query; // 'book' atau 'normalBook'
        
        const filePath = source === 'book' ? bookPath : normalBookPath;
        const books = JSON.parse(await fs.readFile(filePath, 'utf8'));
        
        // Generate ID baru
        const maxId = Math.max(...books.map(b => b.id), 0);
        newBook.id = maxId + 1;
        
        books.push(newBook);
        await fs.writeFile(filePath, JSON.stringify(books, null, 2));
        
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: 'Error adding book' });
    }
});

// PUT update buku
app.put('/api/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBook = req.body;
        
        // Generate slug dari judul
        updatedBook.slug = updatedBook.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
        
        let [books, normalBooks] = await Promise.all([
            fs.readFile(bookPath, 'utf8').then(JSON.parse),
            fs.readFile(normalBookPath, 'utf8').then(JSON.parse)
        ]);
        
        let bookFound = false;
        
        // Update di book.json
        if (books.some(b => b.id === parseInt(id))) {
            books = books.map(book => 
                book.id === parseInt(id) ? { ...book, ...updatedBook } : book
            );
            await fs.writeFile(bookPath, JSON.stringify(books, null, 2));
            bookFound = true;
        }
        
        // Update di normalBook.json
        if (normalBooks.some(b => b.id === parseInt(id))) {
            normalBooks = normalBooks.map(book => 
                book.id === parseInt(id) ? { ...book, ...updatedBook } : book
            );
            await fs.writeFile(normalBookPath, JSON.stringify(normalBooks, null, 2));
            bookFound = true;
        }
        
        if (!bookFound) {
            return res.status(404).json({ error: 'Book not found' });
        }
        
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ error: 'Error updating book' });
    }
});

// DELETE buku
app.delete('/api/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        let [books, normalBooks] = await Promise.all([
            fs.readFile(bookPath, 'utf8').then(JSON.parse),
            fs.readFile(normalBookPath, 'utf8').then(JSON.parse)
        ]);
        
        let bookFound = false;
        
        // Hapus dari book.json
        if (books.some(b => b.id === parseInt(id))) {
            books = books.filter(book => book.id !== parseInt(id));
            await fs.writeFile(bookPath, JSON.stringify(books, null, 2));
            bookFound = true;
        }
        
        // Hapus dari normalBook.json
        if (normalBooks.some(b => b.id === parseInt(id))) {
            normalBooks = normalBooks.filter(book => book.id !== parseInt(id));
            await fs.writeFile(normalBookPath, JSON.stringify(normalBooks, null, 2));
            bookFound = true;
        }
        
        if (!bookFound) {
            return res.status(404).json({ error: 'Book not found' });
        }
        
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting book' });
    }
});

// Get cart items
app.get('/api/cart', async (req, res) => {
    try {
        const cartData = await fs.readFile(cartPath, 'utf8');
        const cart = JSON.parse(cartData);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cart' });
    }
});

// Add to cart
app.post('/api/cart', async (req, res) => {
    try {
        const cartData = await fs.readFile(cartPath, 'utf8');
        const cart = JSON.parse(cartData);
        
        const newItem = {
            id: Math.max(...cart.map(item => item.id), 0) + 1,
            userId: 1, // Temporary userId
            ...req.body,
            addedAt: new Date().toISOString()
        };
        
        cart.push(newItem);
        await fs.writeFile(cartPath, JSON.stringify(cart, null, 2));
        
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: 'Error adding to cart' });
    }
});

// Update cart item
app.put('/api/cart/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const cartData = await fs.readFile(cartPath, 'utf8');
        let cart = JSON.parse(cartData);
        
        const index = cart.findIndex(item => item.id === parseInt(id));
        if (index === -1) {
            return res.status(404).json({ error: 'Cart item not found' });
        }
        
        cart[index] = { ...cart[index], ...req.body };
        await fs.writeFile(cartPath, JSON.stringify(cart, null, 2));
        
        res.json(cart[index]);
    } catch (error) {
        res.status(500).json({ error: 'Error updating cart item' });
    }
});

// Delete cart item
app.delete('/api/cart/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const cartData = await fs.readFile(cartPath, 'utf8');
        let cart = JSON.parse(cartData);
        
        cart = cart.filter(item => item.id !== parseInt(id));
        await fs.writeFile(cartPath, JSON.stringify(cart, null, 2));
        
        res.json({ message: 'Cart item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting cart item' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 