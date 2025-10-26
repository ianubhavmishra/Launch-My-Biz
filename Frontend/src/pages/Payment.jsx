import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { Store_context } from '../components/context/Storecontext'

const Payment = () => {

    const [plan, setplan] = useState("monthly");
    const { backendUrl } = useContext(Store_context);
  function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await axios.post(`${backendUrl}/payment/${plan}`);

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: "rzp_test_r6FiJfddJh76SI", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Soumya Corp.",
            description: "Test Transaction",
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await axios.post(`${backendUrl}/payment/${plan}`, data);

                alert(result.data.msg);
            },
            prefill: {
                name: "Soumya Dey",
                email: "SoumyaDey@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Soumya Dey Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <header className="max-w-2xl mx-auto p-6 bg-blue-50 rounded-md shadow-md mt-10">
                <p className='text-center'>Buy Subscription to proceed!</p>
                <button className="max-w-2xl mx-auto p-6 bg-blue-50 rounded-md shadow-md mt-10" onClick={()=> {setplan("monthly"), displayRazorpay()}}>
                    Pay ₹100 for Monthly Subscription
                </button>
                <button className="max-w-2xl mx-auto p-6 bg-blue-50 rounded-md shadow-md mt-10" onClick={()=> {setplan("yearly") ,displayRazorpay()}}>
                    Pay ₹1000 for Yearly Subscription
                </button>
            </header>
        </div>
    );
}

export default Payment
