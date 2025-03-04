import { motion as _motion } from 'framer-motion';
import { FaHistory, FaTrash } from 'react-icons/fa';

const RecentSearches = ({ searches, onSelectSearch, onClearHistory }) => {
  if (!searches || searches.length === 0) {
    return null;
  }

  return (
    <_motion.div
      className="recent-searches-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="recent-searches-header">
        <div className="title">
          <FaHistory />
          <h3>Recent Searches</h3>
        </div>
        <button className="clear-all-btn" onClick={onClearHistory} title="Clear all">
          <FaTrash />
        </button>
      </div>

      <div className="searches-list">
        {searches.map((search, index) => (
          <_motion.div
            key={`${search}-${index}`}
            className="search-item"
            whileHover={{ scale: 1.03 }}
            onClick={() => onSelectSearch(search)}
          >
            <span>{search}</span>
          </_motion.div>
        ))}
      </div>
    </_motion.div>
  );
};

export default RecentSearches;