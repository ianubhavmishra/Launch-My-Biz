import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope, MapPin, Clock, Menu, X, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  { title: "General Consultation", description: "Expert medical advice and treatment options." },
  { title: "Emergency Care", description: "24/7 emergency response and ambulance services." },
  { title: "Pharmacy", description: "Wide range of medicines available at affordable prices." },
];

export default function ClinicTemplate() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-green-700 text-white shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <a href="#" className="text-2xl font-bold">ClinicPlus</a>
          </div>


          {/* Mobile Menu Button */}
          <button className="sm:hidden -ml-10" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Navigation Links */}
          <div className={`absolute sm:static top-16 left-0 w-full sm:w-auto bg-green-800 sm:bg-transparent text-center sm:flex flex-col sm:flex-row items-center sm:space-x-6 transition-transform duration-300 z-50 ${menuOpen ? "block" : "hidden sm:flex"}`}>
            <a href="#" onClick={() => setMenuOpen(false)} className="block sm:inline-block py-2 sm:py-0 hover:text-gray-300 font-semibold">Home</a>
            <a href="#services" onClick={() => setMenuOpen(false)} className="block sm:inline-block py-2 sm:py-0 hover:text-gray-300 font-semibold">Services</a>
            <a href="#find-us" onClick={() => setMenuOpen(false)} className="block sm:inline-block py-2 sm:py-0 hover:text-gray-300 font-semibold">Find Us</a>
            <a href="#footer" onClick={() => setMenuOpen(false)} className="block sm:inline-block py-2 sm:py-0 hover:text-gray-300 font-semibold">Contact</a>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <header className="relative w-full h-[300px] sm:h-[400px] md:h-[300px] bg-green-700 flex flex-col items-center justify-center text-white text-center px-6 mt-16">
        <div className="absolute inset-0 bg-[url('/images/clinic-banner.jpg')] bg-cover bg-center opacity-50"></div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg relative z-10">
          Your Trusted Healthcare Partner
        </h1>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg max-w-md sm:max-w-2xl drop-shadow-md relative z-10">
          Providing top-quality healthcare services and essential medicines with expert consultation.
        </p>
        <button className="mt-5 sm:mt-6 bg-green-600 hover:bg-green-700 px-5 sm:px-6 py-2 sm:py-3 text-base sm:text-lg relative z-10 rounded-lg">
          Book an Appointment
        </button>
      </header>


      {/* About Section */}
      <section className="py-16 px-6 text-center bg-gray-100">
        <h2 className="text-3xl font-semibold text-green-600">Why Choose Us?</h2>
        <p className="mt-4 text-lg max-w-3xl mx-auto text-gray-700">
          We offer professional healthcare services, 24/7 emergency support, and an in-house pharmacy to ensure your well-being.
        </p>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-6 bg-white text-center">
        <h2 className="text-3xl font-semibold text-green-600">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div key={index} className="shadow-lg p-6 rounded-lg border border-gray-200 bg-gray-50 hover:shadow-xl" whileHover={{ scale: 1.05 }}>
              <Stethoscope className="w-12 h-12 text-green-600 mx-auto" />
              <h3 className="text-xl font-semibold mt-4">{service.title}</h3>
              <p className="mt-2 text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Clinic Location and Timings */}
      <section id="find-us" className="py-12 px-4 bg-gray-100 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold text-green-600">Find Us</h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-6">
          <div className="flex items-center gap-2 text-base sm:text-lg">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            <p className="text-gray-800">456 Wellness Avenue, New Delhi</p>
          </div>
          <div className="flex items-center gap-2 text-base sm:text-lg">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            <p className="text-gray-800">Mon-Sat: 9 AM - 9 PM | Sun: 10 AM - 6 PM</p>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer id="footer" className="bg-gray-800 text-white text-center text-sm sm:text-base">
        <div className="container mx-auto px-4 py-6 sm:py-8 flex flex-col items-center">
          <div className="text-center mb-4 space-y-2">

            <p>
              Email:
              <a href="mailto:contact@clinicstore.com" className=" hover:text-gray-400 transition">
                contact@clinicstore.com
              </a>
            </p>
            <p>Phone: +1 (800) 555-0199</p>

          </div>
          <div className="border-t border-gray-600 w-full pt-4">
            <p>&copy; 2025 Clinic Store. Your Health, Our Priority.</p>
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
            onClick={() => alert("🚧 This template is currently under development. In the meantime, feel free to explore other options. Stay tuned! 🔧")}
            className="bg-black text-white px-2 py-1 text-sm rounded-md shadow-md hover:bg-gray-800 transition flex items-center gap-1"
          >
            Select
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:block">
          <button
            onClick={() => alert("🚧 This template is currently under development. In the meantime, feel free to explore other options. Stay tuned! 🔧")}
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
  );
}
