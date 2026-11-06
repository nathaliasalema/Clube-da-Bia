
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Inicio from './pages/Inicio'
import NossaEstante from './pages/NossaEstante'

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nossa-estante" element={<NossaEstante />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
