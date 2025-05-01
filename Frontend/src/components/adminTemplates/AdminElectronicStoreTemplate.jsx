"use client"
import React, { useState, useEffect, useCallback, useContext } from "react";
import { Store_context } from "../context/Storecontext";
import { useUser } from "@clerk/clerk-react";
import { Menu, X, Trash2, Plus } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";


export default function AdminElectronicStoreTemplate() {
  const [products, setProducts] = useState([]);
  const [siteName, setSiteName] = useState("");
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "null" });
  const [showErrors, setShowErrors] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [welcomeText, setWelcomeText] = useState("");
  const [tagline, setTagline] = useState("");
  const [logo, setLogo] = useState("null");
  const [menuOpen, setMenuOpen] = useState(false);
  const [bgImage, setBgImage] = useState("null");
  const [footerData, setFooterData] = useState({
    Email: "support@electrostore.com",
    Phone: "(123) 456-7890",
    Address: "123 Tech Avenue, Silicon City, TX 75001",
    Available: "Mon-Fri 9:00 Am - 10:00 Pm",
  });

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
        products: "Products",
        footer: "Footer Info",
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
      setShowAddProduct(false);
      console.log(updatedProducts);
      debouncedUpdate("products", updatedProducts);
    }
  };

  const removeProduct = async (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    debouncedUpdate("products", updatedProducts);
  };

  // Handle text changes
  const handleFooterChange = (field, value) => {
    setFooterData((prev) => ({ ...prev, [field]: value }));
    debouncedUpdate("footer", footerData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center relative z-50">
        {/* Logo and Site Name */}
        <div className="flex items-center space-x-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
            id="logo-upload"
          />
          <label htmlFor="logo-upload" className="cursor-pointer">
            <img
              src={logo}
              alt="Logo"
              className="w-8 h-8 sm:w-12 sm:h-12 rounded-full object-cover"
            />
          </label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => {
              setSiteName(e.target.value);
              debouncedUpdate("siteName", e.target.value);
            }}
            className="text-lg sm:text-xl font-bold tracking-wide bg-transparent border-none focus:outline-none"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleBackgroundUpload}
            className="hidden"
            id="bg-upload"
          />
        </div>

        {/* Mobile Toggle Button */}
        <button className="sm:hidden z-50" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Menu */}
        <nav
          className={`absolute sm:static top-full left-0 w-full sm:w-auto bg-gray-700 sm:bg-transparent flex-col sm:flex sm:flex-row items-start pl-3 sm:space-x-6 text-sm transition-all duration-300 ${menuOpen ? "flex" : "hidden sm:flex"
            }`}
        >
          <a href="#"
            className="block sm:inline-block py-1 sm:py-0 hover:text-gray-300 sm:font-semibold">
            Home
          </a>
          <a href="#featured"
            className="block sm:inline-block py-1 sm:py-0 hover:text-gray-300 sm:font-semibold">
            Products
          </a>
          <a href="#footer"
            className="block sm:inline-block py-1 sm:py-0 hover:text-gray-300 sm:font-semibold">
            About
          </a>
        </nav>
      </header>


      <main className="flex-grow">
      <section
  className="relative flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-14 text-center bg-gray-100 cursor-pointer"
  style={{
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '220px', // kam height
  }}
  onClick={(e) => {
    if (e.target.tagName !== "INPUT") {
      document.getElementById("bg-upload").click();
    }
  }}
>
  {/* Hidden file input for background image */}
  <input
    type="file"
    accept="image/*"
    onChange={handleBackgroundUpload}
    className="hidden"
    id="bg-upload"
  />

  {/* Welcome text */}
  <input
    type="text"
    value={welcomeText}
    onChange={(e) => {
      setWelcomeText(e.target.value);
      debouncedUpdate("welcomeText", e.target.value);
    }}
    className="text-xl sm:text-4xl font-extrabold text-black mb-2 bg-transparent border-none text-center focus:outline-none w-full max-w-3xl"
  />

  {/* Tagline */}
  <input
    type="text"
    value={tagline}
    onChange={(e) => {
      setTagline(e.target.value);
      debouncedUpdate("tagline", e.target.value);
    }}
    className="text-base sm:text-lg md:text-xl text-black bg-transparent border-none text-center focus:outline-none w-full max-w-2xl"
  />
</section>

        <section id="featured" className="container mx-auto px-4 py-8 sm:py-12">
          <h2 className="text-xl sm:text-4xl font-extrabold mb-6 text-center font-serif tracking-wide text-black sm:text-gray-900 drop-shadow-md sm:drop-shadow-lg">
            Featured Products
          </h2>
          <button
            onClick={() => setShowAddProduct(!showAddProduct)}
            className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-green-700 ml-0 mb-4"
          >
            <Plus size={20} className="mr-2" /> Add Product
          </button>
          {showAddProduct && (
            <div className="mb-6 p-4 bg-gray-100 rounded-lg w-full sm:w-80 lg:w-[1000px] mx-auto">
              <input
                type="text"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="w-full p-2 border mb-2 text-lg placeholder:text-base lg:placeholder:text-xl"
              />
              {!newProduct.name && showErrors && (
                <p className="text-red-500 text-sm">Product name is required</p>
              )}

              <input
                type="number"
                placeholder="Product Price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                className="w-full p-2 border mb-2 text-lg placeholder:text-base lg:placeholder:text-xl"
              />
              {!newProduct.price && showErrors && (
                <p className="text-red-500 text-sm">Product price is required</p>
              )}

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
                  addNewProduct(); // your existing logic to push the product
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
              >
                Save Product
              </button>
            </div>)}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {(products || []).map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden p-4 relative">
                <button onClick={() => removeProduct(product.id)} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-700">
                  <Trash2 size={16} />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(product.id, e)}
                  className="hidden"
                  id={`upload-${product.id}`}
                />
                <label htmlFor={`upload-${product.id}`} className="block cursor-pointer">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-40 sm:h-48 object-cover rounded-md shadow-md"
                  />
                </label>
                <div className="p-4">
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleInputChange(product.id, "name", e.target.value)}
                    className="w-full border p-1 mb-2 text-center text-lg font-semibold"
                  />
                  <input
                    value={product.price}
                    onChange={(e) => handleInputChange(product.id, "price", e.target.value)}
                    className="w-full border p-1 mb-2 text-center text-base sm:text-lg"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 w-full">
                    Visit Us Now!
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer id="footer" className="bg-gray-800 text-white text-center text-sm sm:text-base">
        <div className="container mx-auto px-4 py-6 sm:py-8 flex flex-col items-center">
          <div className="text-center mb-4 space-y-2">
            <p>
              Phone:<span contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleFooterChange("Phone", e.target.innerText)}>{footerData.Phone}</span>
            </p>
            <p>
              Email:{" "}
              <a
                href={`mailto:${footerData.Email}`}
                className="underline hover:text-gray-400 transition"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleFooterChange("Email", e.target.innerText)}
              >
                {footerData.Email}
              </a>
            </p>
            <p>
              Address: <span contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleFooterChange("Address", e.target.innerText)}>{footerData.Address}</span>
            </p>
            <p>
              Available: <span contentEditable
                suppressContentEditableWarning
                onBlur={(e) => handleFooterChange("Available", e.target.innerText)}>{footerData.Availability}</span>
            </p>
          </div>
          <div className="border-t border-gray-600 w-full pt-4">
            <p>copyright: © 2025 {siteName}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
