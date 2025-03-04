import { useState } from 'react';
import { motion as _motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, 
  FaMapMarkerAlt, 
  FaLink, 
  FaBuilding, 
  FaTwitter, 
  FaGithub,
  FaUsers,
  FaStar,
  FaCodeBranch,
  FaBook,
  FaFileAlt
} from 'react-icons/fa';

const UserCard = ({ user, repositories, readme }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [expandedRepo, setExpandedRepo] = useState(null);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Card animation 
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 350,
        damping: 25,
        mass: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    hover: {
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
      transition: {
        type: "spring",
        stiffness: 400
      }
    }
  };

  // Tab animation
  const tabVariants = {
    inactive: { 
      color: "#6b7280", 
      backgroundColor: "transparent",
      scale: 1
    },
    active: { 
      color: "#2563eb",
      backgroundColor: "rgba(37, 99, 235, 0.1)",
      scale: 1.05,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    hover: { 
      scale: 1.05,
      backgroundColor: "rgba(37, 99, 235, 0.05)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    }
  };

  // Content animation 
  const contentVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      x: 10,
      transition: { 
        duration: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };


  const repoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: i * 0.05
      }
    }),
    hover: { 
      y: -5,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400
      }
    },
    expanded: {
      backgroundColor: "rgba(243, 244, 246, 0.8)",
      transition: {
        duration: 0.2
      }
    },
    visibleAndExpanded: {
      opacity: 1,
      y: 0,
      backgroundColor: "rgba(243, 244, 246, 0.8)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

 
  const counterVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 0.3
      }
    }
  };

  return (
    <_motion.div 
      className="user-card bg-white rounded-xl shadow-md overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout
    >
      <div className="card-header p-4 border-b border-gray-200">
        <div className="tab-controls flex space-x-2">
          {[
            { id: 'profile', icon: <FaUser />, label: 'Profile' },
            { id: 'repos', icon: <FaBook />, label: 'Repositories' },
            { id: 'readme', icon: <FaFileAlt />, label: 'README' }
          ].map((tab) => (
            <_motion.button 
              key={tab.id}
              className={`tab-button flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all`}
              onClick={() => setActiveTab(tab.id)}
              variants={tabVariants}
              animate={activeTab === tab.id ? "active" : "inactive"}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              <_motion.div 
                initial={{ rotate: 0 }}
                animate={activeTab === tab.id ? { rotate: [0, -10, 10, 0] } : {}}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="mr-2"
              >
                {tab.icon}
              </_motion.div>
              <span>{tab.label}</span>
            </_motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'profile' ? (
          <_motion.div 
            key="profile"
            className="profile-content p-6"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <_motion.div 
              className="profile-header flex items-start mb-6"
              variants={itemVariants}
            >
              <_motion.div 
                className="avatar-container mr-6"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 0,
                  transition: { 
                    type: "spring", 
                    stiffness: 300, 
                    delay: 0.2 
                  }
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 5,
                  transition: { type: "spring", stiffness: 400 }
                }}
              >
                <img 
                  src={user.avatar_url} 
                  alt={`${user.login}'s avatar`} 
                  className="avatar w-24 h-24 rounded-full border-4 border-blue-100" 
                />
              </_motion.div>
              <div className="user-info flex-1">
                <_motion.h2 
                  className="text-2xl font-bold mb-1"
                  variants={itemVariants}
                >
                  {user.name || user.login}
                </_motion.h2>
                <_motion.a 
                  href={user.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="username flex items-center text-gray-600 mb-2 hover:text-blue-600 transition-colors"
                  variants={itemVariants}
                >
                  <FaGithub className="mr-2" />
                  {user.login}
                </_motion.a>
                {user.bio && (
                  <_motion.p 
                    className="bio text-gray-700"
                    variants={itemVariants}
                  >
                    {user.bio}
                  </_motion.p>
                )}
              </div>
            </_motion.div>

            <_motion.div 
              className="stats-container flex justify-around mb-6 p-4 bg-gray-50 rounded-lg"
              variants={itemVariants}
            >
              {[
                { value: user.followers, label: 'Followers', icon: <FaUsers /> },
                { value: user.following, label: 'Following', icon: <FaUsers /> },
                { value: user.public_repos, label: 'Repositories', icon: <FaBook /> }
              ].map((stat, i) => (
                <_motion.div 
                  key={stat.label}
                  className="stat-item flex flex-col items-center"
                  variants={counterVariants}
                  custom={i}
                  whileHover={{ scale: 1.1 }}
                >
                  <_motion.div className="text-blue-500 mb-1">
                    {stat.icon}
                  </_motion.div>
                  <_motion.span 
                    className="stat-value text-xl font-bold text-gray-800"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 + (i * 0.1) }}
                  >
                    {stat.value}
                  </_motion.span>
                  <span className="stat-label text-sm text-gray-600">{stat.label}</span>
                </_motion.div>
              ))}
            </_motion.div>

            <_motion.div 
              className="details-container space-y-3 mb-6"
              variants={itemVariants}
            >
              {[
                { value: user.company, icon: <FaBuilding />, display: user.company },
                { value: user.location, icon: <FaMapMarkerAlt />, display: user.location },
                { 
                  value: user.blog, 
                  icon: <FaLink />, 
                  display: user.blog && (
                    <a 
                      href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {user.blog}
                    </a>
                  )
                },
                { 
                  value: user.twitter_username, 
                  icon: <FaTwitter />, 
                  display: user.twitter_username && (
                    <a 
                      href={`https://twitter.com/${user.twitter_username}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      @{user.twitter_username}
                    </a>
                  )
                }
              ].filter(item => item.value).map((item, i) => (
                <_motion.div 
                  key={i}
                  className="detail-item flex items-center text-gray-700"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  whileHover={{ x: 5 }}
                >
                  <_motion.span 
                    className="text-gray-500 mr-3"
                    whileHover={{ rotate: 15, scale: 1.2, color: "#4B5563" }}
                  >
                    {item.icon}
                  </_motion.span>
                  <span>{item.display}</span>
                </_motion.div>
              ))}
            </_motion.div>

            <_motion.div 
              className="joined-info flex items-center text-gray-600 text-sm"
              variants={itemVariants}
            >
              <FaUser className="mr-2" />
              <span>Joined GitHub on {formatDate(user.created_at)}</span>
            </_motion.div>
          </_motion.div>
        ) : activeTab === 'repos' ? (
          <_motion.div 
            key="repos"
            className="repos-content p-6"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <_motion.h3 
              className="text-xl font-bold mb-4 text-gray-800"
              variants={itemVariants}
            >
              Top Repositories
            </_motion.h3>
            {repositories.length > 0 ? (
              <_motion.div className="repos-list space-y-4">
                {repositories.map((repo, i) => (
                  <_motion.div 
                    key={repo.id} 
                    className="repo-item p-4 rounded-lg border border-gray-200 hover:border-blue-300"
                    variants={repoVariants}
                    custom={i}
                    initial="hidden"
                    animate={expandedRepo === repo.id ? "visibleAndExpanded" : "visible"}
                    whileHover="hover"
                    onClick={() => setExpandedRepo(expandedRepo === repo.id ? null : repo.id)}
                  >
                    <_motion.div 
                      className="repo-header flex items-center justify-between mb-2"
                      variants={itemVariants}
                    >
                      <h4 className="font-medium text-lg">
                        <a 
                          href={repo.html_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {repo.name}
                        </a>
                      </h4>
                      {repo.fork && (
                        <_motion.span 
                          className="fork-badge text-xs px-2 py-1 bg-gray-200 rounded-full text-gray-700"
                          whileHover={{ scale: 1.1 }}
                        >
                          Fork
                        </_motion.span>
                      )}
                    </_motion.div>
                    
                    {repo.description && (
                      <_motion.p 
                        className="repo-description text-gray-700 mb-3 line-clamp-2"
                        variants={itemVariants}
                      >
                        {repo.description}
                      </_motion.p>
                    )}
                    
                    <_motion.div 
                      className="repo-details flex flex-wrap items-center text-sm text-gray-600 gap-4"
                      variants={itemVariants}
                    >
                      {repo.language && (
                        <_motion.span 
                          className="repo-language flex items-center"
                          whileHover={{ scale: 1.1 }}
                        >
                          <span 
                            className="language-color w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: getLanguageColor(repo.language) }}
                          ></span>
                          {repo.language}
                        </_motion.span>
                      )}
                      
                      <_motion.span 
                        className="repo-stat flex items-center"
                        whileHover={{ scale: 1.1, color: "#f59e0b" }}
                      >
                        <FaStar className="mr-1" />
                        {repo.stargazers_count}
                      </_motion.span>
                      
                      <_motion.span 
                        className="repo-stat flex items-center"
                        whileHover={{ scale: 1.1, color: "#10b981" }}
                      >
                        <FaCodeBranch className="mr-1" />
                        {repo.forks_count}
                      </_motion.span>
                      
                      <_motion.span className="repo-updated text-gray-500">
                        Updated on {formatDate(repo.updated_at)}
                      </_motion.span>
                    </_motion.div>
                  </_motion.div>
                ))}
              </_motion.div>
            ) : (
              <_motion.div 
                className="no-repos p-6 text-center text-gray-500"
                variants={itemVariants}
              >
                <p>No repositories found for this user.</p>
              </_motion.div>
            )}
          </_motion.div>
        ) : (
          <_motion.div 
            key="readme"
            className="readme-content p-6"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <_motion.h3 
              className="text-xl font-bold mb-4 text-gray-800"
              variants={itemVariants}
            >
              Profile README
            </_motion.h3>
            {readme ? (
              <_motion.div 
                className="readme-container p-4 border border-gray-200 rounded-lg prose max-w-none"
                variants={itemVariants}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  transition: { delay: 0.3, duration: 0.5 }
                }}
                dangerouslySetInnerHTML={{ __html: readme }}
              />
            ) : (
              <_motion.div 
                className="no-readme bg-gray-50 p-6 rounded-lg text-center text-gray-600"
                variants={itemVariants}
              >
                <p className="mb-2">No profile README found for this user.</p>
                <p className="readme-info text-sm text-gray-500">
                  GitHub users can create a special README that appears on their profile by creating a repository 
                  with the same name as their username and adding a README.md file to it.
                </p>
              </_motion.div>
            )}
          </_motion.div>
        )}
      </AnimatePresence>
    </_motion.div>
  );
};

// language color
const getLanguageColor = (language) => {
  const colors = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    Java: '#b07219',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Ruby: '#701516',
    PHP: '#4F5D95',
    Go: '#00ADD8',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    Rust: '#dea584',
  };
  
  return colors[language] || '#8257e5'; 
};

export default UserCard;