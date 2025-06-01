import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const benefits = [
  { icon: "https://img.icons8.com/ios-filled/20/ffffff/no-audio--v1.png", text: "Ad-free music listening" },
  { icon: "https://img.icons8.com/ios-filled/20/ffffff/download--v1.png", text: "Download to listen offline" },
  { icon: "https://img.icons8.com/ios-filled/20/ffffff/shuffle.png", text: "Play songs in any order" },
  { icon: "https://img.icons8.com/ios-filled/20/ffffff/high-volume--v1.png", text: "High audio quality" },
  { icon: "https://img.icons8.com/ios-filled/20/ffffff/group-foreground-selected.png", text: "Listen with friends in real time" }
];

const PremiumPage = () => {
  const [offer, setOffer] = useState('4 months of Premium Individual for free');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Please login first");
      navigate("/");
    }
  }, [navigate]);

  const handleUpgradeClick = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/payment/create-order");

      console.log("Response status:", res.status);
      const orderData = res.data;

      const options = {
        key: "rzp_live_LgRDZ7vi3PvenR", // Your Razorpay public key
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Music App Premium",
        description: "Upgrade to Premium",
        order_id: orderData.id,
        handler: function (response) {
          const user = JSON.parse(localStorage.getItem("user"));
          const updatedUser = { ...user, isPremium: true };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          alert("🎉 Payment successful! You are now a premium user.");
          navigate("/profile");
        },
        prefill: {
          name: "Music User",
          email: "user@example.com",
        },
        theme: {
          color: "#0d6efd",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert("Something went wrong during payment.");
      console.error(error);
    }
  };

  return (
    <div className="bg-black text-white pb-5" style={{ paddingBottom: '120px' }}>
      {/* Hero Image Grid */}
      <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
        <div
          className="position-absolute w-100 h-100"
          style={{
            transform: 'rotate(-3deg) scale(1.1)',
            top: 0,
            left: 0,
            zIndex: 1,
            opacity: 0.6
          }}
        >
          <div className="container-fluid p-0">
            {[1, 2].map((row, rIdx) => (
              <div className="row g-1" key={rIdx}>
                {[...Array(3)].map((_, i) => (
                  <div className="col" key={`img-${rIdx}-${i}`}>
                    <img src="Jass.jpeg" className="img-fluid" style={{ height: '112px', objectFit: 'cover' }} alt="cover" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mt-4 position-relative" style={{ zIndex: 5 }}>
        <div className="d-flex align-items-center gap-2 mb-2">
          <img src="Jass.jpeg" alt="Premium Logo" width={24} height={24} className="rounded-circle" />
          <span className="text-white-50 small fw-medium">Premium</span>
        </div>

        <h1 className="fs-3 fw-bold mb-3">
          Listen without limits. Try<br />
          {offer}.
        </h1>

        <div
          className="d-inline-flex align-items-center gap-2 bg-secondary text-white px-3 py-2 rounded mb-2 small fw-medium"
          role="button"
          onClick={() => setOffer(offer.includes("4 months") ? "3 months of Premium Duo for free" : "4 months of Premium Individual for free")}
        >
          <i className="bi bi-info-circle text-primary" />
          Limited time offer — Click to switch
        </div>

        <p className="text-muted small mb-4">
          You can't upgrade to Premium in the app. We know, it's not ideal.
        </p>

        <button className="btn btn-primary w-100 mb-5" onClick={handleUpgradeClick}>
          Upgrade Now
        </button>

        <div className="bg-dark rounded p-4">
          <h5 className="fw-bold mb-3">Why join Premium?</h5>
          <ul className="list-unstyled">
            {benefits.map((b, i) => (
              <li key={i} className="d-flex align-items-center mb-3">
                <img src={b.icon} alt="" className="me-3" />
                {b.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Footer Navigation */}
      <div className="d-md-none position-fixed bottom-0 start-0 end-0 bg-dark text-white border-top border-secondary z-3">
        <div className="d-flex justify-content-around py-2">
          {[
            { to: "/home", icon: "bi-house-door-fill", label: "Home" },
            { to: "/search", icon: "bi-search", label: "Search" },
            { to: "/punjabi", icon: "bi-music-note-list", label: "Library" },
            { to: "/create", icon: "bi-plus-circle-fill", label: "Create" },
            { to: "/premium", icon: "bi-gem", label: "Premium" },
          ].map((item, idx) => (
            <Link key={idx} to={item.to} className="text-white text-center text-decoration-none">
              <i className={`bi ${item.icon} fs-4 d-block`} />
              <small>{item.label}</small>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;
