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
import FloatingChatbot from "react-floatbot";
import 'react-floatbot/dist/index.css';

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
        <FloatingChatbot
        apiKey={import.meta.env.VITE_API_KEY}
        modelName="gemini-2.0-flash"
        initialMessage="Hello! How can I help you today?"
        botName="Launch MY Biz-AI Assistant"
        position="bottom-right"
        theme={{
          primaryColor: "#4F46E5",
          userBubbleColor: "#4F46E5",
          botBubbleColor: "#E0E7FF",
          backgroundColor: "#f3f4f6",
        }}
        width={350}
        height={500}
        headerText="Launch MY Biz-AI Assistant"
        placeholderText="Ask me anything..."
        isOpenOnLoad={false}
      />
   </div>
  )
}

export default App
