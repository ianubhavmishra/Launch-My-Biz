import shopModel from '../models/shopModel.js'
import { generateShopUrl } from '../utils/generateShopURL.js'

async function addShop(req, res) {

    const shop = new shopModel({
        ownersId:req.body.ownersId,
        template:req.body.template,
        siteName:req.body.storeName,
        welcomeText: req.body.welcomeText, 
        tagline:req.body.tagline,
        footer:req.body.footer,
        logo:req.body.storeLogoUrl,
        bgImage:req.body.headerImageUrl,
    })

    try { 
        const savedShop = await shop.save();
        
        // Call generateUrl function with the necessary parameter (e.g., savedShop._id or savedShop.siteName)
        const shopUrl = generateShopUrl(savedShop.siteName);

        // Update shop with generated URL
        savedShop.url = shopUrl;
        await savedShop.save(); // Save the updated shop document
    
        res.json({ 
            success: true, 
            message: "Shop added",
            url: shopUrl // Return the generated URL
        });
    } catch (error) {
        console.error("Error adding shop:", error);
        res.status(500).json({ success: false, message: "An error occurred" });
    }
}

// dynamically shop rendering

const renderShops = async (req, res, shopUrl) => {
    try {
        // console.log("Shop URL received:", shopUrl); 

        // Fetch the shop based on the shop URL
        const shop = await shopModel.findOne({ url: shopUrl });

        // Check if shop exists
        if (!shop) {
            return res.status(404).json({ success: false, message: "Shop not found" });
        }

        // Send shop data as JSON response
        res.json({ success: true, data: shop });

    } catch (error) {
        console.error("Error fetching shop:", error);
        res.status(500).json({ success: false, message: "An error occurred" });
    }
};


// manage shop (Admin)

// Controller to fetch shop details for the logged-in user
const manageShopDetails = async (req, res) => {
    try {
      // Extract user ID from Authorization header
      const userId = req.headers.authorization?.split(" ")[1];
  
      // Check if user ID exists
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized: No user ID provided" });
      }
  
      // Fetch shop associated with the user ID
      const shop = await shopModel.findOne({ ownersId: userId });
  
      // Check if shop exists
      if (!shop) {
        return res.status(404).json({ error: "Shop not found for this user" });
      }
  
      // Send shop details as JSON response
      res.status(200).json(shop);
    } catch (error) {
      console.error("Error fetching shop:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };


// Controller to update shop details
const updateShopDetails = async (req, res) => {
  try {
    // Extract user ID from Authorization header
    const userId = req.headers.authorization?.split(" ")[1];


    // Check if user ID exists
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: No user ID provided" });
    }

    // Get field and value from request body
    const { field, value } = req.body;

    // Validate input
    if (!field || value === undefined) {
      return res.status(400).json({ error: "Field and value are required" });
    }

    // Find and update the shop document
    const updatedShop = await shopModel.findOneAndUpdate(
      { ownersId: userId },
      { [field]: value },
      { new: true, runValidators: true } // Returns the updated document
    );

    // Check if shop exists
    if (!updatedShop) {
      return res.status(404).json({ error: "Shop not found for this user" });
    }

    // Send updated shop details as JSON response
    res.status(200).json(updatedShop);
  } catch (error) {
    console.error("Error updating shop:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
  

export {addShop,renderShops,manageShopDetails,updateShopDetails}