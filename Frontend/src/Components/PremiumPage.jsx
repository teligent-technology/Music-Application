import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PremiumPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Please login first");
      navigate("/");
    }
  }, [navigate]);

  const handleUpgrade = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const updatedUser = {
      ...user,
      isPremium: true,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("🎉 Congratulations! You are now a premium user.");
    navigate("/profile");
  };

  return (
    <div className="container py-5 text-center">
      <h1 className="mb-3">Upgrade to Premium</h1>
      <p className="mb-4">
        Get ad-free music, high-quality audio, offline downloads, and more!
      </p>

      <div className="card p-4 mx-auto" style={{ maxWidth: "400px" }}>
        <h4 className="mb-3">Premium Plan - ₹99/month</h4>
        <button className="btn btn-warning fw-bold" onClick={handleUpgrade}>
          Upgrade Now 🚀
        </button>
      </div>
    </div>
  );
};

export default PremiumPage;
