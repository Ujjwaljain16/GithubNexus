import { useState, useRef, useEffect } from 'react';
import { FaSearch, FaHistory } from 'react-icons/fa';

const SearchBar = ({ onSearch, recentSearches = [], onSelectRecent }) => {
  const [username, setUsername] = useState('');
  const [showRecent, setShowRecent] = useState(false);
  const searchInputRef = useRef(null);
  const recentSearchesRef = useRef(null);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
      setShowRecent(false);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  // Focus on search input when component mounts
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // Close recent searches dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (recentSearchesRef.current && !recentSearchesRef.current.contains(event.target) && 
          event.target !== searchInputRef.current) {
        setShowRecent(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-wrapper">
          <input
            ref={searchInputRef}
            type="text"
            value={username}
            onChange={handleInputChange}
            onFocus={() => recentSearches.length > 0 && setShowRecent(true)}
            placeholder="Enter GitHub username..."
            className="search-input"
          />
          {username && (
            <button
              type="button"
              onClick={() => setUsername('')}
              className="clear-button"
            >
              ×
            </button>
          )}
          <button type="submit" className="search-button">
            <FaSearch />
            <span>Search</span>
          </button>
        </div>

        {/* Recent Searches Dropdown */}
        {showRecent && recentSearches.length > 0 && (
          <div className="recent-searches" ref={recentSearchesRef}>
            <div className="recent-header">
              <FaHistory />
              <span>Recent Searches</span>
            </div>
            <ul>
              {recentSearches.map((search, index) => (
                <li
                  key={index}
                  onClick={() => {
                    onSelectRecent(search);
                    setUsername(search);
                    setShowRecent(false);
                  }}
                >
                  {search}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;