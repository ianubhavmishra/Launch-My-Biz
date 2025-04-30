import { v4 as uuidv4 } from "uuid";
import { frontendURl } from "../server.js";

export const generateShopUrl = (shopName) => {
  if (!shopName || typeof shopName !== "string") {
    console.log(shopName);
    throw new Error("Invalid shop name provided");
    
  }

  return `${frontendURl}/shop/${shopName.trim().replace(/\s+/g, "-")}-${uuidv4().slice(0, 5)}`;
};
