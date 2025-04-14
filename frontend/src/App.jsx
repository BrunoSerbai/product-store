import React from 'react'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import ProductPage from './components/ProductPage'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme="forest">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </div>
  )
}

export default App