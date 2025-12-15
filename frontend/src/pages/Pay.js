import React from "react";
import "../styles/Pay.css";

const Pay = () => {
  const startPayment = async () => {
    const amount = 799;

    try {
     // const response = await fetch("http://localhost:5000/api/payment", {
const res = await fetch(
  `${process.env.REACT_APP_API_URL}/api/payment`,
  {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      if (!data.success) {
        alert("❌ Payment initiation failed");
        return;
      }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "Bargaining Bazaar",
        description: "Chat Bargain Product Payment",
        order_id: data.orderId,
        handler: function (response) {
          alert("✅ Payment Successful!\nPayment ID: " + response.razorpay_payment_id);
          window.location.href = "/thankyou";
        },
        prefill: {
          name: "Customer",
          email: "customer@example.com",
        },
        theme: {
          color: "#007bff",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert("⚠️ Something went wrong. Please try again.");
      console.error("Payment Error:", err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="card p-4 shadow" style={{ borderRadius: "1rem", width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-3">Pay with Razorpay</h3>
        <p className="text-muted text-center">Click below to pay ₹799 securely</p>
        <button className="btn btn-primary w-100" onClick={startPayment}>
          Pay ₹799
        </button>
      </div>
    </div>
  );
};

export default Pay;
