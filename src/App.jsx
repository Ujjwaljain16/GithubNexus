import { useState, useEffect } from 'react';
import Home from './pages/Home';
import './styles/app.css';
import { FaMoon, FaSun } from 'react-icons/fa';

function App() {
  const savedMode = localStorage.getItem("darkMode");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [darkMode, setDarkMode] = useState(savedMode ? JSON.parse(savedMode) : prefersDark);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="app">
      <button 
        className="theme-toggle" 
        onClick={toggleDarkMode}
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
      <Home />
      <footer className="app-footer">
        <p>
          Built with <span className="heart">♥</span> using React
        </p>
        <p className="copyright">© {new Date().getFullYear()} GitHub Nexus</p>
      </footer>
    </div>
  );
}

export default App;