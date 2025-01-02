//import { BrowserRouter, Routes, Route } from "react-router-dom"
//import Home from "./pages/Home"
//import BukuDetail from "./pages/bukuDetail"

//export default function App() {
//  return (
//    <BrowserRouter>
//      <Routes>
//        <Route path="/" element={<Home />} />
//        <Route path="/detail/:id" element={<BukuDetail />} />
//      </Routes>
//    </BrowserRouter>
//  )
//}
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Search from './pages/Search';
import BukuDetail from './pages/bukuDetail';
import BookManager from './pages/BookManager';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/search" element={<Search />} />
        <Route path="/detail/:id" element={<BukuDetail />} />
        <Route path="/manage-books" element={<BookManager />} />
      </Routes>
    </Router>
  );
}

export default App; 