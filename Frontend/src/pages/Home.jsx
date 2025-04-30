import { useState, useRef, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {ArrowRight, ChevronLeft, ChevronRight, Facebook, Twitter, Instagram} from "lucide-react";
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Store_context } from "../components/context/Storecontext";


const templates =[{
  id: 1,
  url: "/temp1",
  image: "https://res.cloudinary.com/dfq5ttsjy/image/upload/v1745918262/g2b9zfk2wz6r1hk847tn.png",
  title: "Food Store Template",
  description: "A vibrant and modern food store template designed to showcase your delicious offerings. With sections for menus and contact details, it’s perfect for restaurants, cafes, and cloud kitchens. Fully responsive and easily customizable — get your food business online in minutes!"
},{
  id: 2,
  url: "/temp2",
  image: "https://res.cloudinary.com/dfq5ttsjy/image/upload/v1745923380/hp6h9gktr5z6ckrfzzus.png",
  title: "Electronic Store Template",
  description: "A sleek and dynamic electronic store template built to highlight your latest gadgets and tech products. Featuring product showcases, specifications, and contact details — this template is perfect for electronics shops, gadget retailers, and tech brands. Fully responsive, fast, and simple to customize for your growing business!"
},{
  id: 3,
  url: "/temp3",
  image: "https://res.cloudinary.com/dfq5ttsjy/image/upload/v1745920516/rxwxas1u9a6eldyanx4b.png",
  title: "Jwellery Store Template",
  description: "An elegant and luxurious template crafted to showcase fine jewellery collections. Highlight your best pieces with stunning visuals, detailed product info, and trust-building testimonials. Perfect for jewellers and boutiques looking to make a lasting impression online"
},{
  id: 4,
  url: "/temp4",
  image: "https://res.cloudinary.com/dfq5ttsjy/image/upload/v1745920446/kgorejxrlykngsllhzts.png",
  title: "Healthcare Template",
  description: "A clean and professional template tailored for pharmacies, clinics, and healthcare suppliers. List products, services, and essential info with clarity. Designed for trust, accessibility, and easy navigation — ideal for bringing medical services online."
},{
  id: 5,
  url: "/temp5",
  image: "https://res.cloudinary.com/dfq5ttsjy/image/upload/v1745920447/gwgw4gljpim8vcow7adq.png",
  title: "Fashion Store Template",
  description: "A stylish and bold fashion store template designed to flaunt your latest collections. Perfect for clothing brands, boutiques, and designers. Fully responsive with product galleries, lookbooks, and smooth user experience to keep shoppers engaged."
}];

const steps = [
  { emoji: "🧩", text: "Start by selecting a template tailored for your business." },
  { emoji: "📝", text: "Fill out a simple form to share your business details." },
  { emoji: "🛍️", text: "Easily add your products and services through the admin dashboard." },
  { emoji: "✨", text: "Go live and welcome customers to your brand-new online presence." },
];


export default function Home() {

  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [shopUrl, setShopUrl] = useState(null);
  const {adminData} = useContext(Store_context);
  const [copied, setCopied] = useState(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(setShopUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (isSignedIn) {
      const storedUrl = localStorage.getItem("shopUrl");
      setShopUrl(storedUrl);
    } else {
      localStorage.removeItem("shopUrl");
      setShopUrl(null);
    }
  }, [isSignedIn]);
  
  useEffect(() => {
    if (adminData?.url) {
      setShopUrl(adminData.url);
    }
  }, [adminData]);
  

  return (

    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-white shadow-md py-4 px-2 sm:px-6 flex justify-between items-center fixed w-full top-0 z-100">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center">
          <img src="/LaunchMyBiz-logo.png" className="w-10 pr-1" /> Launch My Biz
        </h1>
        <div className="flex gap-4">
          {isSignedIn ? (
            <div className='flex items-center gap-2 sm:gap-3'>
              <p className='text-gray-600 max-sm:hidden'>Hi, {user.fullName}</p>
              <UserButton />
            </div>
          ) : (
            <button onClick={openSignIn} className='bg-zinc-800 text-white flex items-center gap-4 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full'>
              Get Started <ArrowRight className="w-5 h-5 text-white" />
            </button>
          )}
        </div>
      </nav>

      {/* main */}
      <div className="relative w-full flex flex-col items-center text-center py-28 px-6 overflow-hidden mt-18">
        <img
          src="bg.jpg"
          alt="Launch My Biz"
          className="absolute inset-0 w-full h-full object-cover opacity-70 z-0"
        />

        <div className='absolute w-full text-center font-semibold  flex justify-center top-1/2 transform -translate-y-1/2'>
          <p className="text-[17px] sm:text-[20px] md:text-[24px] lg:text-[28px]">
            <i>Launch your business online on <span className="bg-yellow-300 px-2">Launch My Biz</span></i>
            <p></p>
            <i>Simple, efficient, and <span className="underline text-blue-600">Free!</span></i>
          </p>
        </div>
      </div>

      {shopUrl ? <div className="flex flex-col md:flex-row items-center justify-center bg-gray-100 p-6 mt-9 rounded-xl shadow-xl border-2 border-gray-300 max-w-screen-xl mx-auto">
        {/* Left Side */}
        <div className="w-full md:w-1/2 p-5 border-b md:border-b-9 md:border-r border-gray-300 flex flex-col items-center justify-center">
          <iframe
            src={shopUrl}
            title="Site Preview"
            className="w-full h-64 md:h-80 border rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            style={{ overflow: 'hidden' }}
          // scrolling="no"
          ></iframe>
          <a href={shopUrl} target="_blank" rel="noopener noreferrer" className="mt-5 bg-blue-600 text-white w-full text-center py-3 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-800 hover:scale-105 hover:shadow-xl">
            Visit Site
          </a>
        </div>

        {/* Right Side */}
        <div className="w-full xl:h-[30vw] md:w-1/2  p-5 flex flex-col items-center text-center justify-around">
          <div className="xl:text-2xl font-bold bg-green-500 text-white py-3 px-2 w-full rounded-lg shadow-lg mb-5">
            🥳 Congratulations Your site is Live ✈
          </div>

          <div className="w-full xl:h-40 p-4 bg-white border rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 flex flex-col justify-around">
            <input
              type="text"
              value={shopUrl}
              readOnly
              className="w-full p-3 border rounded-lg text-center text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-50"
            />
            <button
              onClick={copyToClipboard}
              className="mt-3 w-full bg-gray-600 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300 hover:bg-gray-800 hover:scale-105 hover:shadow-lg"
            >
              {copied ? "✅ Copied!" : "Copy URL"}
            </button>
          </div>

          <a href={"/admin"} target="_blank" rel="noopener noreferrer" className="mt-5 bg-gray-800 text-white py-3 w-full rounded-lg shadow-md transition-all duration-300 hover:bg-gray-900 hover:scale-105 hover:shadow-xl">
            Manage Site
          </a>
        </div>
      </div> : <></>
      }

      {/* // {how to works} */}
      <div className="bg-gray-100 min-h-[40vh] mt-9 flex items-center justify-center">
        <section className="bg-gradient-to-b from-gray-200 to-gray-100 text-center xl:pt-16 px-6 w-full">
          <motion.h2
            className="xl:text-5xl text-3xl font-extrabold text-gray-800 xl:mb-16 mb-6 animate-fade-in"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            How It Works
          </motion.h2>

          {/* Steps Container */}
          <div className="flex flex-col md:flex-row justify-center items-center mt-9 gap-10 max-w-7xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="md:w-1/4 bg-white py-12 px-8 shadow-xl rounded-2xl flex flex-col justify-between text-center border border-gray-300 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-blue-500 min-h-72"
                whileHover={{ scale: 1.07 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="text-5xl mb-4">{step.emoji}</div>
                <h3 className="text-2xl font-bold text-blue-600 mb-4">
                  Step {index + 1}
                </h3>
                <p className="text-gray-700 text-lg">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* why choose us */}
      <div className="bg-gray-100 py-16 px-6 md:px-12 w-full">
        {/* Section Title */}
        <motion.h2
          className="xl:text-5xl text-3xl font-extrabold text-center text-gray-900 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Why Choose Us?
        </motion.h2>

        {/* Feature Cards */}
        <div className="flex flex-col md:flex-row justify-center items-center mt-9 gap-10 max-w-7xl mx-auto">
          {[
            { icon: "🚀", title: "High Quality", desc: "We provide top-notch templates with premium designs." },
            { icon: "📱", title: "Fully Responsive", desc: "Optimized for all screen sizes and devices." },
            { icon: "⚡", title: "Easy & Fast Customization", desc: "Modify your site through the admin dashboard — every change reflects instantly for your visitors.." }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white w-96 h-56 p-10 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center justify-center text-center px-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="text-7xl mb-5">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>


      {/* templates */}
      <div className="p-6 sm:p-10 bg-gray-200 relative">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-center text-gray-900 mb-8 sm:mb-12">
          Our Templates
        </h2>

        <div className="relative flex items-center justify-center max-w-7xl mx-auto gap-4">
          {/* Left Navigation Button */}
          <button
            className="absolute left-4 z-10 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-all sm:p-4"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Swiper Carousel */}
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }} // Auto sliding enabled
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16 w-full"
          >
            {templates.map((template) => (
              <SwiperSlide key={template.id} className="flex justify-center px-4 sm:px-5">
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)" }}
                  onClick={() => navigate(template.url)}
                  className="relative cursor-pointer h-[260px] sm:h-[350px] w-full max-w-xs sm:max-w-lg"
                >
                  {/* Card Container */}
                  <div className="h-full w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300 relative bg-gradient-to-br from-blue-100 via-purple-100 to-red-100">
                    {/* Image with Full Display (object-contain) */}
                    <img
                      src={template.image}
                      alt={template.title}
                      className="w-full h-[80%] object-contain rounded-t-2xl "
                    />

                    {/* Title */}
                    <div className="p-4 sm:p-6 text-center">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{template.title}</h3>
                    </div>

                    {/* Hover Effect for Description */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-black/80 text-white flex items-center justify-center p-6 sm:p-8 text-center text-lg font-semibold rounded-2xl opacity-0 hover:opacity-100"
                    >
                      {template.description}
                    </motion.div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Right Navigation Button */}
          <button
            className="absolute right-4 z-10 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-all sm:p-4"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center min-h-[30vh] bg-gradient-to-br from-gray-200 via-gray-400 to-gray-100 text-center py-16 px-6">
  <div className="p-4 sm:p-8 rounded-2xl shadow-2xl bg-gray-500 text-center max-w-full sm:max-w-md lg:max-w-2xl transform transition duration-500 hover:scale-105">
    <h2 className="text-x sm:text-2xl lg:text-3xl text-white drop-shadow-lg">
    Your feedback helps us improve — feel free to share your suggestions or report any issues.
    </h2>
    <form
      action="https://api.web3forms.com/submit"
      method="POST"
      className="mt-6 space-y-4"
    >
      <input
        type="hidden"
        name="access_key"
        value="7e5fb86d-ac04-4e8c-9e94-1ce3026b0790"
      />
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        required
        className="w-full sm:px-4 p-1 sm:py-3 bg-gray-800 text-white border-none rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        required
        className="w-full sm:px-4 p-1 sm:py-3 bg-gray-800 text-white border-none rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <textarea
        name="message"
        placeholder="Your Feedback or Suggestion"
        required
        rows="4"
        className="w-full sm:px-4 p-1 sm:py-3 bg-gray-800 text-white border-none rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
      ></textarea>
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white sm:py-3 py-1 rounded-xl shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
      >
        Send Feedback →
      </button>
    </form>
    <p className="mt-4 text-gray-400 text-sm">
      We appreciate your input — it helps us improve.
    </p>
  </div>
</div>


<footer className="bg-gray-800 text-white py-6 sm:py-8">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Top Section: About & Contact */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      
      {/* About Section */}
      <div className="text-left px-4 sm:px-8">
        <h3 className="text-lg sm:text-xl font-semibold mb-3">About Launch My Biz</h3>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          <span className="font-semibold">Launch My Biz</span> empowers small shop owners to create stunning websites effortlessly. 
          Our platform bridges the gap between local businesses and the digital world by providing customizable templates 
          that reflect each brand's unique identity.
        </p>
        <p className="mt-2 text-sm sm:text-base text-gray-300 leading-relaxed">
          Whether you're a budding entrepreneur or an established business, we help you create a professional online presence 
          with minimal effort and maximum impact.
        </p>
      </div>

      {/* Contact Information */}
      <div className="text-left px-4 sm:px-8">
        <h3 className="text-lg sm:text-xl font-semibold mb-3">Contact Us</h3>
        <p className="text-sm sm:text-base text-gray-300">
          📧 Email: <a href="mailto:contact@launchmybiz.com" className="hover:text-white">anubhavmishra2408@gmail.com</a>
        </p>
        <p className="mt-2 text-sm sm:text-base text-gray-300">
          📞 Phone: <a href="tel:+919999999999" className="hover:text-white">+91 99999 99999</a>
        </p>
        <p className="mt-2 text-sm sm:text-base text-gray-300">
          📍 Location: Panipat, India
        </p>
      </div>
    </div>

    {/* Divider */}
    <hr className="border-gray-600 my-4" />

    {/* Bottom Section: Social Media & Copyright */}
    <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8">
      
      {/* Social Media Icons */}
      <div className="flex items-center gap-4 mb-3 sm:mb-0">
        <span className="text-gray-400">Follow Us:</span>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
          <Facebook size={24} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
          <Twitter size={24} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
          <Instagram size={24} />
        </a>
      </div>

      {/* Copyright */}
      <p className="text-gray-400 text-sm sm:text-base">
        &copy; 2025 <span className="font-semibold">Launch My Biz</span>. All rights reserved.
      </p>
    </div>
  </div>
</footer>
    </div>
  );
}