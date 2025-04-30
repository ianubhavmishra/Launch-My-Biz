import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FoodStoreLanding = ({shop}) => {
  const logoUrl = shop.logo;
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
      <div className="bg-orange-50 font-sans scroll-smooth">
      {/* Header */}
      <header className="bg-orange-200 py-4 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="flex items-center space-x-2">
            {logoUrl ? (
              <>
                <img src={logoUrl} alt="logo" className="w-10 h-10 rounded-full" />
                <h1 className="text-2xl font-bold text-orange-800">{shop.siteName}</h1>
              </>
            ) : (
              <h1 className="text-2xl font-bold text-orange-800">{shop.siteName}</h1>
            )}
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-6 text-orange-900 font-medium">
              <li><a href="#home" className="hover:underline">Home</a></li>
              <li><a href="#menu" className="hover:underline">Menu</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
            </ul>
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-orange-900 text-2xl focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mt-1 md:hidden bg-orange-100 px-6 pt-2 pb-4">
            <ul className="flex flex-col space-y-4 text-orange-800 font-medium">
              <li><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
              <li><a href="#menu" onClick={() => setMenuOpen(false)}>Menu</a></li>
              <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
            </ul>
          </div>
        )}
      </header>


      {/* Hero Section */}
      <section id="home" className="flex flex-col md:flex-row items-center justify-between px-6 py-10 bg-orange-100">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-orange-800">{shop.welcomeText}</h2>
          <p className="mt-4 text-orange-700">
          {shop.tagline}
          </p>
          <button className="mt-6 px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700">
            Visit Now
          </button>
        </div>
        <img
          src={shop.bgImage}
          alt="Food Dish"
          className="md:w-1/2 mt-6 md:mt-0 rounded-lg shadow-xl"
        />
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-12 bg-orange-100">
        <h3 className="text-3xl text-center font-bold text-orange-800 mb-8">Menu</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
          {(shop?.products || []).map((item, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-4 text-center">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-lg" />
              <h4 className="mt-4 text-xl font-semibold text-orange-800">{item.name}</h4>
              <p className="text-orange-600">₹{item.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 px-6 bg-orange-100">
        <h3 className="text-3xl text-center font-bold text-orange-800 mb-8">Get In Touch</h3>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-orange-700">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="font-semibold mb-2">Address</h4>
            <p>{shop.footer.Address}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="font-semibold mb-2">Phone</h4>
            <p>{shop.footer.Phone}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="font-semibold mb-2">Email</h4>
            <p>{shop.footer.Email}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="font-semibold mb-2">Hours</h4>
            <p>{shop.footer.Availability}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-orange-900 text-white text-center py-6 mt-10">
        <p>&copy; 2025 {shop.siteName}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FoodStoreLanding;
