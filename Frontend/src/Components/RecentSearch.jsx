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
    <Link
              to="/home"
              className="position-absolute top-0 end-0 m-3 btn btn-outline-warning btn-sm z-3"
              style={{ zIndex: 3 }}
            >
              🏠 Home
            </Link>
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
    </>

  );
};

export default RecentSearches;
