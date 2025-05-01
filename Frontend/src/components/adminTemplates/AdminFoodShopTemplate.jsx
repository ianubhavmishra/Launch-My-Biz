import React, { useState, useRef, useEffect, useCallback, useContext } from "react";
import {Store_context} from "../context/Storecontext";
import { Trash2, Plus, Menu, X } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";

const FoodStoreLanding = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [siteName, setSiteName] = useState("");
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "null" });
  const [showErrors, setShowErrors] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [welcomeText, setWelcomeText] = useState("");
  const [tagline, setTagline] = useState("");
  const [logo, setLogo] = useState("null");
  const [editable, setEditable] = useState(true);
  const [bgImage, setBgImage] = useState("null");
  const [footerData, setFooterData] = useState({
    Email: "support@electrostore.com",
    Phone: "(123) 456-7890",
    Address: "123 Tech Avenue, Silicon City, TX 75001",
    Available: "Mon-Fri 9:00 Am - 10:00 Pm",
  });

  const menuImageRefs = useRef([]);
  const { user } = useUser();
  const { backendUrl, adminData } = useContext(Store_context);

  useEffect(() => {
    fetchShopDetails();
  }, []);

  const fetchShopDetails = async () => {
    try {
      const { siteName, welcomeText, tagline, logo, bgImage, products, footer } = adminData;
      setSiteName(siteName);
      setWelcomeText(welcomeText);
      setTagline(tagline);
      setLogo(logo);
      setBgImage(bgImage);
      setProducts(products);
      setFooterData(footer);

    } catch (error) {
      console.error("Error fetching shop details:", error);
    }
  };

  const updateShopDetails = async (field, value) => {
    try {
      await axios.put(
        `${backendUrl}/shop/manageshop`,
        { field, value },
        {
          headers: {
            Authorization: `Bearer ${user.id}`,
            "Content-Type": "application/json",
          },
        }
      );
      return true;
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      return false;
    }
  };

  // Debounce Function
  function debounce(func, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer); // Reset timer on every keystroke
      timer = setTimeout(() => func(...args), delay); // Call after delay
    };
  }

  // Create a debounced version of updateShopDetails with toast
const debouncedUpdate = useCallback(
  debounce(async (field, value) => {
    const success = await updateShopDetails(field, value);

    const fieldMap = {
      products: "Menu items",
      footer: "Contact details",
      siteName: "Store Name",
      welcomeText: "Welcome text",
      tagline: "Tagline"
    };

    if (success) {
      toast.success(`${fieldMap[field] || field} updated successfully!`, {
        duration: 3000,
        style: {
          borderRadius: "10px",
          background: "#e6fffa",
          color: "#2c7a7b",
        },
      });
    } else {
      toast.error(`Failed to update ${fieldMap[field] || field}`, {
        duration: 3000,
        style: {
          borderRadius: "10px",
          background: "#ffe6e6",
          color: "#b91c1c",
        },
      });
    }
  }, 1500),
  []
);

  //image upload function for cloudinary
  const uploadToBackend = async (file) => {
    const formData = new FormData();
    formData.append("file", file); // Cloudinary expects "file"
    formData.append("upload_preset", "Launch_my_biz");
    formData.append("cloud_name", "dfq5ttsjy");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dfq5ttsjy/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      return data.url; // Return the URL here
    } catch (error) {
      console.error("Upload Error:", error);
      return null;
    }
  };

  // Upload background image
  const handleBackgroundUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const toastId = toast.loading("Uploading background...");
    const url = await uploadToBackend(file);

    if (url) {
      setBgImage(url); // your state updater
      updateShopDetails("bgImage", url);
      toast.success("Background updated!", { id: toastId });
    } else {
      toast.error("Background upload failed.", { id: toastId });
    }
  };

  // Upload logo image
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const toastId = toast.loading("Uploading logo...");
    const url = await uploadToBackend(file);

    if (url) {
      setLogo(url); // update your logo state
      updateShopDetails("logo", url);
      toast.success("Logo uploaded!", { id: toastId });
    } else {
      toast.error("Logo upload failed.", { id: toastId });
    }
  };

  // Upload product image
  const handleImageUpload = async (id, event) => {
    const file = event.target.files[0];
    const toastId = toast.loading("Uploading image...");
    if (file) {
      const imageUrl = await uploadToBackend(file);
      if (imageUrl) {
        handleInputChange(id, "image", imageUrl);
      }
      toast.success("Image uploaded!", { id: toastId });
    } else {
      toast.error("Image upload failed.", { id: toastId });
    }
  };

  const handleInputChange = (id, field, value) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, [field]: value } : product
    );
    setProducts(updatedProducts);
    debouncedUpdate("products", updatedProducts);
  };

  const addNewProduct = async () => {
    if (newProduct.name && newProduct.price) {
      const updatedProducts = [...(products || []), { id: Date.now(), ...newProduct }];
      setProducts(updatedProducts);
      setNewProduct({ name: "", price: "", image: "" });
      setShowAddMenu(false);
      console.log(updatedProducts);
      debouncedUpdate("products", updatedProducts); // assuming this updates the backend
    }
  };

  const removeProduct = async (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    debouncedUpdate("products", updatedProducts);
  };

  // Handle footer changes
  const handleFooterChange = (field, value) => {
    setFooterData((prev) => ({ ...prev, [field]: value }));
    debouncedUpdate("footer", footerData);
  };

  return (
    <div className="bg-orange-50 font-sans scroll-smooth">
      {/* Header */}
      <header className="bg-orange-200 py-4 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6">
          {/* Logo + Site Name */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" id="logo-upload" />
            <label htmlFor="logo-upload" className="cursor-pointer">
              <img src={logo} alt="Logo" className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover" />
            </label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="text-lg sm:text-2xl font-bold text-orange-800 bg-transparent border-none focus:outline-none"
            />
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-orange-900" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-6 text-orange-900 font-medium">
              <li><a href="#home">Home</a></li>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="md:hidden px-6 mt-2">
            <ul className="flex flex-col text-sm gap-2 text-orange-900">
              <li><a href="#home">Home</a></li>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="flex flex-col-reverse md:flex-row items-center justify-between sm:px-6 sm:py-10 px-3 py-5 bg-orange-100 gap-8">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <>
            <input
              type="text"
              value={welcomeText}
              onChange={(e) => { setWelcomeText(e.target.value); debouncedUpdate("welcomeText", e.target.value) }}
              className="text-xl sm:text-4xl font-extrabold text-orange-800 bg-transparent border-none w-full sm:mb-4 text-center md:text-left"
            />
            <input
              value={tagline}
              onChange={(e) => { setTagline(e.target.value); debouncedUpdate("tagline", e.target.value); }}
              className="text-orange-700 sm:text-lg text-sm w-full bg-transparent border-none resize-none text-center md:text-left"
            />
          </>
          <a href="#contact">
            <button className="sm:mt-6 mt-3 px-3 sm:px-6 py-1 sm:py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700">
            Visit Now
          </button>
            </a>
        </div>

        <div className="w-full md:w-1/2 flex justify-center relative">
          <img
            src={bgImage}
            alt="Hero"
            className="w-full max-h-[400px] object-cover rounded-lg shadow-xl"
            onClick={() => document.getElementById('heroImageUpload').click()}
          />
          <input
            id="heroImageUpload"
            type="file"
            accept="image/*"
            onChange={handleBackgroundUpload}
            className="hidden"
          />
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="sm:py-12 bg-orange-100">
      <h3 className="sm:text-3xl text-2xl text-center font-bold text-orange-800 sm:mb-8 mb-5">Our Menu</h3>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowAddMenu(!showAddMenu)}
          className="bg-orange-600 text-white px-2 py-1 sm:px-4 sm:py-3 rounded-md flex items-center hover:bg-orange-700"
        >
          <Plus size={20} className="mr-2" /> Add Menu Item
        </button>
      </div>

      {showAddMenu && (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-md w-full max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Item Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="w-full p-2 border mb-2 text-lg placeholder:text-base"
          />
          {!newProduct.name && showErrors && <p className="text-red-500 text-sm">Name is required</p>}

          <input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="w-full p-2 border mb-2 text-lg placeholder:text-base"
          />
          {!newProduct.price && showErrors && <p className="text-red-500 text-sm">Price is required</p>}

          <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  const toastId = toast.loading("Uploading product image...");
                  const imageUrl = await uploadToBackend(file);

                  if (imageUrl) {
                    setNewProduct({ ...newProduct, image: imageUrl });
                    toast.success("Image uploaded!", { id: toastId });
                  } else {
                    toast.error("Image upload failed.", { id: toastId });
                  }
                }}
                className="w-full p-2 border mb-2"
              />
              {!newProduct.image && showErrors && (
                <p className="text-red-500 text-sm">Product image is required</p>
              )}

          <button
            onClick={() => {
              if (!newProduct.name || !newProduct.price || !newProduct.image) {
                setShowErrors(true);
                return;
              }
              setShowErrors(false);
              addNewProduct();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
          >
            Save Item
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
        {(products || []).map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-4 text-center relative">
            <button onClick={() => removeProduct(item.id)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-700 z-10">
              <Trash2 size={16} />
            </button>

            <div className="relative cursor-pointer" onClick={() => menuImageRefs.current[index].click()}>
              <img src={item.image} alt={item.name} className="w-full h-56 object-cover rounded-lg" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={(el) => (menuImageRefs.current[index] = el)}
                onChange={(e) => handleImageUpload(item.id, e)}
              />
            </div>

            <input
              value={item.name}
              onChange={(e) => {
                const updated = [...products];
                updated[index].name = e.target.value;
                handleInputChange(updated);
              }}
              className="mt-4 text-xl font-semibold text-orange-800 text-center bg-transparent outline-none"
            />
            <input
              value={item.price}
              onChange={(e) => {
                const updated = [...products];
                updated[index].price = e.target.value;
                handleInputChange(updated);
              }}
              className="text-orange-600 text-center bg-transparent outline-none"
            />
          </div>
        ))}
      </div>
    </section>

      {/* Contact Section */}
      <section id="contact" className="sm:py-12 p-8 px-6 bg-orange-100">
        <h3 className="text-3xl text-center font-bold text-orange-800 mb-8">Get In Touch</h3>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-orange-700">
          {Object.entries(footerData).map(([key, value]) => (
            <div key={key} className="bg-white sm:p-6 p-3 rounded-lg shadow-md">
              <h4 className="font-semibold sm:mb-2 capitalize">{key}</h4>
              <input
                value={value}
                onChange={(e) => handleFooterChange(key, e.target.value)}
                className="bg-transparent outline-none w-full"
              />
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-orange-900 text-white text-center py-6">
        <p>&copy; 2025 {siteName}. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default FoodStoreLanding;
