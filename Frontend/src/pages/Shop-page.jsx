import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {Store_context} from "../components/context/Storecontext";
import FoodStoreLanding from "../components/liveTemplates/LiveFoodShopTemplate";
import LiveElectronicStoreTemplate from "../components/liveTemplates/LiveElectronicStoreTemplate";

const ShopPage = () => {
  const { slug } = useParams(); // Extract shop slug from URL
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {backendUrl} = useContext(Store_context);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/shop/${slug}`);
        setShop(response.data.data);
        
      } catch (err) {
        console.error("Error fetching shop:", err);
        setError("Shop not found");
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, [slug]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2 className="text-red-600">{error}</h2>;

  const renderTemplate = () => {
    switch (shop.template) {
      case "temp1":
        return <FoodStoreLanding shop={shop} />;
      case "temp2":
        return <LiveElectronicStoreTemplate shop={shop} />;
      // case "temp3":
      //   return <JewelleryShopTemplate shop={shop} />;
      // case "temp4":
      //   return <ClinicTemplate shop={shop} />;
      // case "temp5":
      //   return <ClothingShopTemplate shop={shop} />;

    }
  };

  return (
    <div>{renderTemplate()}</div>
  );
};

export default ShopPage;
