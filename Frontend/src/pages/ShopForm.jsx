import { React, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { X, ArrowRight } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Store_context } from "../components/context/Storecontext";

const StoreForm = () => {
  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const location = useLocation();
  const { backendUrl } = useContext(Store_context);

  // Cloudinary Upload Function
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
      return data.url; // Cloudinary returns the uploaded URL
    } catch (error) {
      console.error("Upload Error:", error);
      return null;
    }
  };

  // Parse the query string
  const searchParams = new URLSearchParams(location.search);
  const temp = searchParams.get("temp"); // returns "temp2"

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Group footer fields
    const finalData = {
      ...data,
      ownersId: user.id,
      template: temp,
      footer: {
        Address: data.address,
        Availability: data.availability,
        Phone: data.phone,
        Email: data.email,
      },
    };

    // Remove individual footer fields from top level
    delete finalData.address;
    delete finalData.availability;
    delete finalData.phone;
    delete finalData.email;

    const response = await axios.post(`${backendUrl}/shop/addshop`, finalData);
    localStorage.setItem("shopUrl", response.data.url);
    toast.success("🎉 Website created successfully!", {
      duration: 3000,
    });
    navigate("/")
  };

  return isSignedIn ? (
    <div className="max-w-2xl mx-auto p-6 bg-blue-50 rounded-md shadow-md mt-10 bg-[url('LaunchMyBiz-logo.png')] bg-no-repeat bg-center bg-contain bg-blend-lighten">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-6">Store Details Form</h2>
        <X className="w-8 h-8 cursor-pointer" onClick={() => navigate("/")} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Store Name */}
        <div>
          <label className="block font-medium mb-1">Store Name</label>
          <input
            type="text"
            {...register("storeName", { required: true })}
            placeholder="My Store"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.storeName && <p className="text-red-500 text-sm">Store name is required</p>}
        </div>

        {/* Welcome Text */}
        <div>
          <label className="block font-medium mb-1">Welcome Text</label>
          <input
            type="text"
            {...register("welcomeText", { required: true })}
            placeholder="Welcome to our store!"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.welcomeText && <p className="text-red-500 text-sm">Welcome text is required</p>}
        </div>

        {/* Tagline/Description */}
        <div>
          <label className="block font-medium mb-1">Tagline / Description</label>
          <textarea
            {...register("tagline", { required: true })}
            placeholder="Best deals every day!"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          {errors.tagline && <p className="text-red-500 text-sm">Tagline is required</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium mb-1">Phone</label>
          <input
            type="text"
            {...register("phone", { required: true })}
            placeholder="+91 98765 43210"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && <p className="text-red-500 text-sm">Phone is required</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="store@example.com"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium mb-1">Address</label>
          <textarea
            {...register("address", { required: true })}
            placeholder="123 Main Street, City"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          {errors.address && <p className="text-red-500 text-sm">Address is required</p>}
        </div>

        {/* Availability */}
        <div>
          <label className="block font-medium mb-1">Availability</label>
          <input
            type="text"
            {...register("availability", { required: true })}
            placeholder="Mon - Sat, 9AM to 9PM"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.availability && <p className="text-red-500 text-sm">Availability is required</p>}
        </div>

        {/* Store Logo (optional) */}
        <div>
          <label className="block font-medium mb-1">Store Logo (optional)</label>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-white file:font-semibold file:text-gray-700 hover:file:bg-gray-100"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                const toastId = toast.loading("Uploading logo...");
                const url = await uploadToBackend(file);

                if (url) {
                  setValue("storeLogoUrl", url);
                  toast.success("Logo uploaded successfully!", { id: toastId });
                } else {
                  toast.error("Failed to upload logo. Please try again.", { id: toastId });
                }
              }
            }}
          />
          <input type="hidden" {...register("storeLogoUrl")} />
        </div>

        {/* Header Image (optional) */}

        <div>
          <label className="block font-medium mb-1">Header Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:bg-white file:font-semibold file:text-gray-700 hover:file:bg-gray-100"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                const toastId = toast.loading("Uploading header image...");
                const url = await uploadToBackend(file);

                if (url) {
                  setValue("headerImageUrl", url);
                  toast.success("Header image uploaded successfully!", { id: toastId });
                } else {
                  toast.error("Failed to upload logo. Please try again.", { id: toastId });
                }
              }
            }}
          />
          <input type="hidden" {...register("headerImageUrl")} />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md text-center w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Please sign up / sign in to continue</h2>
        <p className="text-gray-600 mb-6">You must be signed in before proceeding</p>
        <div className="flex justify-center">
          <button
            onClick={openSignIn}
            className="bg-zinc-800 text-white flex items-center gap-2 px-4 py-2 sm:px-8 sm:py-3 text-sm rounded-full hover:bg-zinc-700 transition"
          >
            Get Started <ArrowRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreForm;