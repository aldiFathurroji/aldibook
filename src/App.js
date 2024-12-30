import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import BukuDetail from "./pages/bukuDetail"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<BukuDetail />} />
      </Routes>
    </BrowserRouter>
  )
}