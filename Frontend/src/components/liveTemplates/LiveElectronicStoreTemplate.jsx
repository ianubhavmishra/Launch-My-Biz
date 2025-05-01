"use client"

import React from "react"
import { Menu, X } from "lucide-react"


export default function LandingPage({ shop }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src={shop.logo} alt="Logo" className="mr-2 w-10 h-10 rounded-full" />
            <span className="sm:text-xl font-bold">{shop.siteName}</span>
          </div>
          <nav className="hidden md:flex space-x-4 text-sm sm:text-base">
            <a href="#" className="hover:text-gray-300">Home</a>
            <a href="#featured" className="hover:text-gray-300">Products</a>
            <a href="#footer" className="hover:text-gray-300">About</a>
          </nav>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden bg-gray-700 px-4 py-2 text-sm">
            <a href="#" className="block py-2">Home</a>
            <a href="#feautred" className="block py-2">Products</a>
            <a href="#footer" className="block py-2">About</a>
          </nav>
        )}
      </header>

      {/* Hero Section with Background Image */}
      <main className="flex-grow">
        <section
          className="bg-cover bg-center bg-no-repeat text-white py-16 sm:py-24"
          style={{ backgroundImage: `url(${shop.bgImage})` }}
        >
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto px-2 sm:px-4">
              <h1 className="text-xl sm:text-4xl font-bold mb-3 sm:mb-5 font-serif text-black break-words leading-tight">
                {shop.welcomeText}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-black font-light break-words leading-snug">
                {shop.tagline}
              </p>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section id="featured" className="container mx-auto px-4 py-8 sm:py-12">
          <h2 className="text-xl sm:text-3xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {(shop?.products || []).map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden p-4">
                <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-40 sm:h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">₹{product.price}</p>
                  <a href="#footer">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 w-full">
                      Visit Us Now!
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="footer" className="bg-gray-800 text-white text-center text-sm sm:text-base">
        <div className="container mx-auto px-4 py-8 flex flex-col items-center">
          <div className="text-center mb-4">
            <p>Phone: {shop.footer.Phone}</p>
            <p>Email: <a href="mailto:support@electrostore.com" className="underline">{shop.footer.Email}</a></p>
            <p>Address: {shop.footer.Address}</p>
            <p>Available: {shop.footer.Availability}</p>
          </div>
          <div className="border-t border-gray-600 w-full pt-4 text-center">
            <p>&copy; 2025 {shop.siteName}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}