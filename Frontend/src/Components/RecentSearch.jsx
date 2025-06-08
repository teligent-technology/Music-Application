import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './RecentSearches.css';

const RecentSearches = () => {
  const [recent, setRecent] = useState([]);
  const username = localStorage.getItem("username");

  const loadRecent = () => {
    if (!username) {
      setRecent([]);
      return;
    }
    const stored = JSON.parse(localStorage.getItem(`recentSearches_${username}`) || "[]");
    setRecent(stored);
  };

  useEffect(() => {
    loadRecent();
  }, [username]);

  return (
    <>

     <div className="bg-dark text-white w-100 min-vh-100 app-root" style={{ color: "white" }}>
      <motion.div
        className="bg-dark text-white w-100 app-root"
        style={{ color: "white" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Container
          fluid
          className="py-3 px-4 border-bottom border-secondary sticky-top bg-black z-3 animated-header"
        >
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <Link to="/profile" aria-label="Profile">
              <motion.div
                className="profile-circle"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                D
              </motion.div>
            </Link>

            <div className="btn-group animated-nav rounded-pill p-1 shadow-sm">
              <motion.button
                className="btn btn-sm btn-dark rounded-pill px-4"
                onClick={() => setShowSearch(false)}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                All
              </motion.button>
              <motion.button
                className="btn btn-sm btn-dark rounded-pill px-4"
                onClick={() => setShowSearch(true)}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                Search
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Link
                  to="/recent-search"
                  className="btn btn-sm btn-dark rounded-pill px-4"
                >
                  View Recent Searches
                </Link>
              </motion.div>
            </div>
          </div>
        </Container>
      </motion.div>
        <Container className="mt-5 recent-searches-container">
      <h2 className="text-gradient mb-4 animate-title">Your Recent Searches</h2>
      <Button variant="secondary" onClick={loadRecent} className="mb-3">
        Refresh Recent Searches
      </Button>
      {recent.length === 0 ? (
        <p className="text-muted animate-fade">No recent searches found.</p>
      ) : (
        <ListGroup variant="flush" className="animate-list">
          {recent.map((term, index) => (
            <ListGroup.Item
              key={index}
              className="recent-search-item"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link to={`/search?q=${encodeURIComponent(term)}`} className="recent-search-link">
                {term}
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
    </div>
    </>

  );
};

export default RecentSearches;
