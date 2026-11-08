
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Inicio from './pages/Inicio'
import NossaEstante from './pages/NossaEstante'
import Sobre from "./pages/Sobre";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nossa-estante" element={<NossaEstante />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
