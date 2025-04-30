import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

const FashionLanding = () => {

  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-white shadow-md">
        <div className="text-lg font-bold">Brand</div>
        <ul className="flex space-x-6 text-gray-700">
          <li><a href="#" className="hover:text-gray-900">Home</a></li>
          <li><a href="#" className="hover:text-gray-900">Shop</a></li>
          <li><a href="#" className="hover:text-gray-900">Blog</a></li>
          <li><a href="#" className="hover:text-gray-900">Portfolio</a></li>
        </ul>
        <div className="flex space-x-4">
          <span className="cursor-pointer">🔍</span>
          <span className="cursor-pointer">🛒</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-200 to-white flex justify-between">
        <div className="flex flex-col justify-center items-center w-[40vw]">
          <p className="text-sm w-[30vw] text-gray-600">New women's collection</p>
          <h1 className="text-4xl w-[30vw] font-bold">AUTUMN-WINTER '22</h1>
        </div>
        <img src="src/assets/clothing-temp/img1.png" alt="" />
      </section>


      {/* Products Section */}
      <h2 className="text-4xl text-center p-12 font-semibold">Products</h2>
      <section className=" flex justify-evenly">
        {/* Left Column */}
        <div className="w-[36vw] flex flex-col justify-between">
          <div className="bg-blue-100 rounded-lg flex items-center justify-between">
            <p className="w-[18vw] text-center">Most Wanted <br /> <strong>Blue Jeans</strong></p>
            <img src="src/assets/clothing-temp/img2.png" alt="Blue Jeans" className="w-[18vw]" />
          </div>
          <div className="bg-pink-100 rounded-lg flex items-center justify-between">
            <img src="src/assets/clothing-temp/img3.png" alt="Dior Bag" className="w-[18vw]" />
            <p className="w-[18vw] text-center">Brand New <br /> <strong>Dior Bag</strong></p>
          </div>
        </div>

        {/* Right Column */}
        <img src="src/assets/clothing-temp/img4.png" alt="Sneakers" className="w-[40vw]" />
      </section>

      {/* Bottom Products Section */}
      <section className="flex justify-evenly py-15">
        <div className="bg-yellow-100 flex flex-col w-[20vw] text-center justify-between">
          <img src="src/assets/clothing-temp/img5.png" alt="Cream Hat" className="w-[20vw]" />
          <p className="pb-2">Will-Bear Andy <br /> <strong>Cream Hat</strong></p>
        </div>
        <div className="bg-green-100 flex w-[30vw] justify-between items-center">
          <p className="text-center w-[15vw]">Midi Skirt <br /> <strong>With Buckle</strong></p>
          <img src="src/assets/clothing-temp/img6.png" alt="Midi Skirt" className="h-[36vh]" />
        </div>
        <div className="bg-gray-100 text-center">
          <img src="src/assets/clothing-temp/img7.png" alt="Sunglasses" className="h-[36vh]" />
        </div>
      </section>

      {/* Contact Information */}
      <section className="px-10 mt-10 grid grid-cols-4 gap-4 text-center">
        <div className="bg-gray-200 p-6 rounded-lg">
          <h3 className="font-semibold">Address</h3>
          <p>Somewhere, West St. #4</p>
        </div>
        <div className="bg-gray-200 p-6 rounded-lg">
          <h3 className="font-semibold">Call Us</h3>
          <p>000-888-444</p>
        </div>
        <div className="bg-gray-200 p-6 rounded-lg">
          <h3 className="font-semibold">Mail Us</h3>
          <p>help@clothingbrand.com</p>
        </div>
        <div className="bg-gray-200 p-6 rounded-lg">
          <h3 className="font-semibold">Opening Hours</h3>
          <p>Mon-Sat: 10am to 8pm</p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white text-center p-6 mt-10">
        <p>&copy; 2025 Jewel. All rights reserved.</p>
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
};

export default FashionLanding;