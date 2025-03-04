import { useState, useEffect } from 'react';
import { motion as _motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import UserCard from '../components/UserCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import RecentSearches from '../components/RecentSearches';
import useGitHubUser from '../hooks/useGitHubUser';
import AnimatedTitle from '../components/AnimatedTitle';
import { FaGithub } from 'react-icons/fa';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  //custom hook
  const { user, repositories, readme, loading, error } = useGitHubUser(searchTerm);

  useEffect(() => {
    const savedSearches = localStorage.getItem('githubUserSearches');
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (e) {
        console.error('Error parsing saved searches', e);
        localStorage.removeItem('githubUserSearches');
      }
    }
  }, []); //empty array runs once on mount 

  // Saving recent searches to local storage
  useEffect(() => {
    localStorage.setItem('githubUserSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

 
  const handleSearch = (username) => {
    setSearchTerm(username);

    setRecentSearches(prev => { //filter duplicates and max 5
      const updatedSearches = [username, ...prev.filter(s => s !== username)].slice(0, 5);
      return updatedSearches;
    });
  };

  const handleSelectRecent = (username) => {
    setSearchTerm(username);
  };


  const handleClearHistory = () => {
    setRecentSearches([]);
    localStorage.removeItem('githubUserSearches');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: { 
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    exit: { 
      y: -20, 
      opacity: 0,
      transition: { 
        duration: 0.2
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <_motion.div 
      className="home-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <_motion.div
        className="app-header"
        variants={itemVariants}
      >
        <_motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <_motion.div
            animate={{ 
              rotate: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              repeatDelay: 5
            }}
          >
            <FaGithub />
          </_motion.div>
          <AnimatedTitle />
        </_motion.div>
        <_motion.p variants={itemVariants}>
        Connect with Code
        </_motion.p>
      </_motion.div>

      <_motion.div variants={itemVariants}>
        <SearchBar 
          onSearch={handleSearch} 
          recentSearches={recentSearches}
          onSelectRecent={handleSelectRecent}
        />
      </_motion.div>

      <AnimatePresence mode="wait">
        {!searchTerm && !loading && !error && !user && (
          <_motion.div 
            key="initial-state"
            className="initial-state"
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <_motion.div variants={itemVariants}>
              <RecentSearches 
                searches={recentSearches} 
                onSelectSearch={handleSelectRecent}
                onClearHistory={handleClearHistory}
              />
            </_motion.div>
            
            {recentSearches.length === 0 && (
              <_motion.div
                className="empty-state"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <_motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <FaGithub className="empty-icon" />
                </_motion.div>
                <_motion.h2 variants={itemVariants}>
                  Enter a GitHub username to start exploring
                </_motion.h2>
                <_motion.p 
                  variants={itemVariants}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "mirror"
                  }}
                >
                  Try searching for your username ,"facebook", "google", or "microsoft"
                </_motion.p>
              </_motion.div>
            )}
          </_motion.div>
        )}
        
        {loading && (
          <_motion.div
            key="loading"
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Loader />
          </_motion.div>
        )}
        
        {error && (
          <_motion.div
            key="error"
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ErrorMessage message={error} />
          </_motion.div>
        )}
        
        {user && !loading && !error && (
          <_motion.div
            key="user-card"
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
          >
            <UserCard user={user} repositories={repositories} readme={readme} />
          </_motion.div>
        )}
      </AnimatePresence>
    </_motion.div>
  );
};

export default Home;