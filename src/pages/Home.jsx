import MainLayout from "../Layout/MainLayout";
import Navbar from "../Components/Navbar";
import books from "../data/book.json";
import Banner from "../Components/benner";
import CardBook from '../Components/card';
import normalBook from "../data/normalBook.json";
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    // Fungsi untuk handle pencarian
    const handleSearch = (query) => {
        navigate(`/search?q=${query}`);
    };

    return (
        <MainLayout>
            <Navbar onSearch={handleSearch} />
            <Banner books={books} />
            <CardBook normalBook={normalBook} />
        </MainLayout>
    );
}