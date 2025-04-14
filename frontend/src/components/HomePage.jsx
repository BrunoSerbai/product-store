import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCartIcon } from "lucide-react"

function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome to Our Store</h1>
            <p className="py-6">Find amazing products at great prices. Shop now and enjoy our special offers!</p>
            <Link to="/products" className="btn btn-primary text-white">Shop Now</Link>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="my-12">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Sample Product Cards */}
          {[1, 2, 3].map((id) => (
            <div key={id} className="card bg-base-100 shadow-xl">
              <figure className="p-4">
                <img src="https://via.placeholder.com/300" alt="Product" className="w-full h-48 object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Product {id}</h2>
                <p className="text-gray-600">Description of product {id} goes here...</p>
                <div className="card-actions justify-between items-center">
                  <span className="text-2xl font-bold text-primary">$99.99</span>
                  <Link to={`/product/${id}`} className="btn btn-primary btn-sm">
                    <ShoppingCartIcon className="w-5 h-5 mr-2" />
                    Add to Cart
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage