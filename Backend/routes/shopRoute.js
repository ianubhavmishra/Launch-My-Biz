import express from 'express'
import { addShop, renderShops, manageShopDetails, updateShopDetails } from '../controllers/shopController.js'
import { frontendURl } from '../server.js';

const shopRouter = express.Router();


//route for shop registration.
shopRouter.post('/addshop',addShop)

//route for shop management 
shopRouter.get('/manageshop',manageShopDetails)
shopRouter.put('/manageshop',updateShopDetails)

//route for rendering shops website.
shopRouter.get('/:slug', (req, res) => {
    const { slug } = req.params; // Extract slug from request parameters
    const fullShopUrl = `${frontendURl}/shop/${slug}`; // Construct full URL
    renderShops(req, res, fullShopUrl); // Pass full URL to renderShops
});


export default shopRouter;