// import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const Store_context = createContext(null)

const StoreContextProvider = (props) => {

    const backendUrl = "https://launch-my-biz.onrender.com";
    const [adminData, setadminData] = useState({})
    const {user} = useUser();
    
    useEffect(() => {
        const fetchAdminData = async () => {
          if (user) {
            try {
              const res = await axios.get(`${backendUrl}/shop/manageshop`, {
                headers: {
                  Authorization: `Bearer ${user.id}`, // Clerk's User ID
                  "Content-Type": "application/json",
                },
              });
      
              if (res.data && Object.keys(res.data).length > 0) {
                setadminData(res.data); // Set if data exists
              } else {
                console.log("No shop data found for new user.");
                setadminData(null); // Important: clear adminData if no data
              }
      
            } catch (err) {
              console.error("Error fetching shop:", err);
              setadminData(null); // Optional: clear adminData on error too
            }
          }
        };
      
        fetchAdminData();
      }, [user]);
      
      
    const context_val = {
        adminData,
        backendUrl
    }
    return (
        <Store_context.Provider value={context_val}>
            {props.children}
        </Store_context.Provider>
    )
}

export default StoreContextProvider;
