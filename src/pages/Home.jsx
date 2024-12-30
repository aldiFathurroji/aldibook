import MainLayout from "../Layout/MainLayout";
import Navbar from "../Components/Navbar";
import books from "../data/book.json"; // Pastikan path benar
import Banner from "../Components/benner";
import CardBook from '../Components/card'
import normalBook from "../data/normalBook.json";

export default function Home() {
    return (
        <MainLayout>
            <Navbar />
            <Banner books={books} />
            <CardBook normalBook={normalBook} />
        </MainLayout>

        
    );

    
}