import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import AdminElectronicStoreTemplate from "../components/adminTemplates/AdminElectronicStoreTemplate";
import FoodStoreLanding from "../components/adminTemplates/AdminFoodShopTemplate";
import { Store_context } from "../components/context/Storecontext";

const AdminDashboard = () => {
  const { adminData } = useContext(Store_context);

  useEffect(() => {
    const hasVisited = localStorage.getItem("adminPanelVisited");

    if (!hasVisited) {
      toast.custom((t) => (
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-6 rounded-xl shadow-2xl border border-blue-300 w-full max-w-md text-center">
          <div className="text-gray-800">
            <h2 className="text-xl font-semibold mb-2">👋 Welcome to your Admin Panel!</h2>
            <p className="text-sm mb-5">
            Here you can instantly update your store details, product info, and images — just click on anything you want to change!
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  localStorage.setItem("adminPanelVisited", "true");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-14 py-1 rounded-xl text-base font-medium transition">
                Got it
              </button>
            </div>
          </div>
        </div>
      ), { duration: Infinity });
    }
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="text-center py-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
          🚀 Launch My Biz – Admin Dashboard
        </h1>
        <p className="mt-2 text-sm md:text-base">
          Ready to manage your store like a pro
        </p>
      </div>

      {/* Render the selected template */}
      {adminData.template === "temp2" && <FoodStoreLanding />}
      {/* {adminData.template === "temp2" && <AdminElectronicStoreTemplate />} */}
    </div>
  );
};

export default AdminDashboard;
