// src/Components/PremiumRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PremiumRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (!user.isPremium) {
    // Logged in but NOT premium
    return <Navigate to="/premium" replace />;
  }

  // Logged in and premium
  return children;
};

export default PremiumRoute;
