import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

const JewelleryShopTemplate = () => {

  const navigate = useNavigate();

  return (
    <div className="bg-black text-white font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 border-b border-gray-700 ">
        <h1 className="text-xl font-bold">Jewel</h1>
        <ul className="flex space-x-6">
          <li><a href="#" className="hover:text-gray-400">Home</a></li>
          <li><a href="#" className="hover:text-gray-400">Shop</a></li>
          <li><a href="#" className="hover:text-gray-400">Contact</a></li>
          <li><a href="#" className="hover:text-gray-400">About</a></li>
        </ul>
        <div className="bg-white text-black px-4 py-2 rounded-lg">Login</div>
      </nav>

      {/* Hero Section */}
      <header className="m-auto flex justify-evenly">
        <div className="w-[40vw] flex flex-col justify-center">
        <h2 className="text-4xl font-bold">Discover The Exceptional Jewellery With Us</h2>
        <p className="my-6 text-gray-400">Elegance that speaks for itself</p>
        <div className="bg-white text-center font-semibold text-xl text-black w-[12vw] py-2 rounded-lg">Visit Us</div>
        </div>
        <img src="src/assets/jewellery-temp/img1.png" alt="Ring" className="w-[40vw] rounded" />
      </header>

      {/* Featured Product */}

      <section className="m-auto py-20 flex justify-evenly">
        <img src="src/assets/jewellery-temp/img2.png" alt="Ring" className="w-[40vw] rounded" />
        <div className="w-[40vw] flex flex-col justify-center">
        <h2 className="text-4xl font-bold">Silver Round Designer Bracelet For Women</h2>
        <p className="my-6 text-gray-400">Elegance that speaks for itself</p>
        <div className="flex justify-around">
          <p className="text-center font-semibold text-xl border-white border-2 w-[12vw] py-2 rounded-lg">$549.29</p>
          <p className="bg-white text-center font-semibold text-xl text-black w-[12vw] py-2 rounded-lg">Visit Us</p>
        </div>
        </div>
      </section>

      <section className="m-auto py-20 flex justify-evenly">
        <div className="w-[40vw] flex flex-col justify-center">
        <h2 className="text-4xl font-bold">An Exquisite Diamond Jewellery  </h2>
        <p className="my-6 text-gray-400">Elegance that speaks for itself</p>
        <div className="flex justify-around">
          <p className="text-center font-semibold text-xl border-white border-2 w-[12vw] py-2 rounded-lg">$549.29</p>
          <p className="bg-white text-center font-semibold text-xl text-black w-[12vw] py-2 rounded-lg">Visit Us</p>
        </div>
        </div>
        <img src="src/assets/jewellery-temp/img3.png" alt="Ring" className="w-[40vw] rounded" />
      </section>

      <section className="m-auto py-20 flex justify-evenly">
        <img src="src/assets/jewellery-temp/img4.png" alt="Ring" className="w-[30vw] rounded" />
        <div className="w-[40vw] flex flex-col justify-center">
        <h2 className="text-4xl font-bold">Jewell Best Collection For You All</h2>
        <p className="my-6 text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error excepturi, perferendis tempore libero ducimus odio aliquam accusantium quis voluptas aperiam assumenda, dicta quas exercitationem recusandae. Nostrum quas cumque earum libero doloribus ex at quasi, vero, nulla, nihil ipsam iusto enim!</p>
          <p className="bg-white text-center font-semibold text-xl text-black w-[12vw] py-2 rounded-lg">Visit Us</p>
        </div>
      </section>

      <section className="m-auto py-20 flex justify-evenly">
        <div className="w-[40vw] flex flex-col justify-center">
        <h2 className="text-4xl font-bold">We Have Everything Which Trendy </h2>
        <p className="my-6 text-gray-400">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta atque earum ut doloribus, doloremque amet maxime odit ea. Qui deserunt molestiae exercitationem perferendis soluta. Beatae vero numquam error sapiente, repudiandae officiis obcaecati nobis ut dolores explicabo ipsum sint magnam soluta.</p>
          <p className="bg-white text-center font-semibold text-xl text-black w-[12vw] py-2 rounded-lg">Visit Us</p>
        </div>
        <img src="src/assets/jewellery-temp/img5.png" alt="Ring" className="w-[30vw] rounded" />
      </section>

      

      {/* Story Section */}
      <section className="text-center py-16 px-10">
        <h2 className="text-3xl font-bold">Our Story</h2>
        <p className="text-gray-400 mt-4">Timeless designs crafted with precision and love.</p>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-gray-700 ">
        <p className="text-gray-400">&copy; 2025 Jewel. All rights reserved.</p>
      </footer>

      <div>
        {/* Mobile Layout */}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 sm:hidden z-50">
          <button
            onClick={() => navigate("/")}
            className="bg-white text-black px-2 py-1 text-sm rounded-md shadow-md hover:bg-gray-800 transition flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4 text-black" />
            Home
          </button>

          <button
            onClick={() => alert("🚧 This template is currently under development. In the meantime, feel free to explore other options. Stay tuned! 🔧")}
            className="bg-white text-black px-2 py-1 text-sm rounded-md shadow-md hover:bg-gray-800 transition flex items-center gap-1"
          >
            Select
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:block">
          <button
            onClick={() => alert("🚧 This template is currently under development. In the meantime, feel free to explore other options. Stay tuned! 🔧")}
            className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-white text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-800 transition flex items-center gap-2 z-50"
          >
            Make it yours
            <ArrowRight className="w-5 h-5 text-black" />
          </button>

          <button
            onClick={() => navigate("/")}
            className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-800 transition flex items-center gap-2 z-50"
          >
            <ArrowLeft className="w-5 h-5 text-black" />
            Back to Home
          </button>
        </div>
      </div>

    </div>
 

  );
};

export default JewelleryShopTemplate;
