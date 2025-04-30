import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home.jsx'
import ShopForm from './pages/ShopForm.jsx';
import ShopPage from './pages/Shop-page.jsx';
import FoodShopTemplate from './pages/templates/FoodShopTemplate.jsx'
import ElectronicsShopTemplate from "./pages/templates/ElectronicsShopTemplate.jsx";
import JewelleryShopTemplate from "./pages/templates/JewelleryShopTemplate.jsx";
import ClinicTemplate from "./pages/templates/ClinicTemplate.jsx";
import ClothingShopTemplate from "./pages/templates/ClothingShopTemplate.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import { Toaster } from "react-hot-toast";


function App() {

  return (
   <div>
      <Toaster position="bottem-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/reg" element={<ShopForm />} />
        <Route path="/shop/:slug" element={<ShopPage />} />
        <Route path="/temp1" element={<FoodShopTemplate />} />
        <Route path="/temp2" element={<ElectronicsShopTemplate />} />
        <Route path="/temp3" element={<JewelleryShopTemplate/>} />
        <Route path="/temp4" element={<ClinicTemplate />} />
        <Route path="/temp5" element={<ClothingShopTemplate />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
   </div>
  )
}

export default App
