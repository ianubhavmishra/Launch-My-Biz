"use client"

import React from "react"
import { useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight, ArrowLeft } from "lucide-react"


const products = [
  { id: 1, name: "Smartphone X", price: 599, image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  { id: 2, name: "Laptop Pro", price: 1299, image: "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  { id: 3, name: "Wireless Earbuds", price: 129, image: "https://images.pexels.com/photos/18012697/pexels-photo-18012697/free-photo-of-earbuds-and-a-spray-bottle-with-liquid.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  { id: 4, name: "Smart Watch", price: 249, image: "https://images.pexels.com/photos/1334602/pexels-photo-1334602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  { id: 5, name: "Tablet Ultra", price: 499, image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
  { id: 6, name: "Bluetooth Speaker", price: 79, image: "https://images.pexels.com/photos/31683433/pexels-photo-31683433/free-photo-of-marshall-portable-bluetooth-speaker-close-up.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" },
]

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="public/LaunchMyBiz-logo.png" alt="Logo" className="mr-2 w-10 h-10" />
            <span className="text-lg sm:text-xl font-bold">ElectroStore</span>
          </div>
          <nav className="hidden md:flex space-x-4 text-sm sm:text-base">
            <a href="#" className="hover:text-gray-300">Home</a>
            <a href="#" className="hover:text-gray-300">Products</a>
            <a href="#" className="hover:text-gray-300">About</a>
          </nav>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden bg-gray-700 px-4 py-2 text-sm">
            <a href="#" className="block py-2">Home</a>
            <a href="#" className="block py-2">Products</a>
            <a href="#" className="block py-2">About</a>
          </nav>
        )}
      </header>

      {/* Hero Section with Background Image */}
      <main className="flex-grow">
        <section
          className="bg-cover bg-center bg-no-repeat text-center text-white py-16 sm:py-24"
          style={{ backgroundImage: "url(https://img.freepik.com/free-photo/digital-camera-graphic-digital-tablet-keyboard-mouse-cellphone-white-background_23-2147880692.jpg?t=st=1742708294~exp=1742711894~hmac=e319e8232f927f924e093b37d86be5b3da35cd59d503d83fb44eb47f16fdc433&w=1380)" }}
        >
          <div className="container mx-auto px-4 text-center sm:text-right">
            <span className="block">
              <h1 className="text-xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 font-serif text-black">
                Welcome <span className="text-white sm:text-black">Co</span>me to ElectroStore
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 text-black font-light">
                Discover the latest in electronic innovations
              </p>
            </span>
          </div>

        </section>

        {/* Featured Products */}
        <section className="container mx-auto px-4 py-8 sm:py-12">
          <h2 className="text-xl sm:text-3xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden p-4">
                <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-40 sm:h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">₹{product.price}</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 w-full">
                    Visit Us Now!
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>


      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center text-sm sm:text-base">
        <div className="container mx-auto px-4 py-8 flex flex-col items-center">
          <div className="text-center mb-4">
            <p>Availability: Mon-Sat | 9:00 Am-10:00 Pm</p>
            <p>Address: 123 Tech Avenue, Silicon City, TX 75001</p>
            <p>Email: <a href="mailto:support@electrostore.com" className="underline">support@electrostore.com</a></p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div className="border-t border-gray-600 w-full pt-4 text-center">
            <p>&copy; 2025 ElectroStore. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <div>
        {/* Mobile Layout */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 sm:hidden z-50">
          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-2 py-1 text-sm rounded-md shadow-md hover:bg-gray-800 transition flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
            Home
          </button>

          <button
            onClick={() => navigate("/reg?temp=temp2")}
            className="bg-black text-white px-2 py-1 text-sm rounded-md shadow-md hover:bg-gray-800 transition flex items-center gap-1"
          >
            Select
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:block">
          <button
            onClick={() => navigate("/reg?temp=temp2")}
            className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-800 transition flex items-center gap-2 z-50"
          >
            Make it yours
            <ArrowRight className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={() => navigate("/")}
            className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-800 transition flex items-center gap-2 z-50"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
            Back to Home
          </button>
        </div>
      </div>

    </div>
  )
}