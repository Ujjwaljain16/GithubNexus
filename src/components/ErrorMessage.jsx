import React, { useState, useEffect } from 'react';
import { motion as _motion } from 'framer-motion';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const ErrorMessage = ({ 
  message, 
  onDismiss, 
  duration = 0,  // no auto-dismiss
  severity = "error" 
}) => {
  const [visible, setVisible] = useState(true);
  
  // Auto-dismiss
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onDismiss) onDismiss();
      }, duration);
      
      return () => clearTimeout(timer);  // component unmounts 
    }
  }, [duration, onDismiss]);
  
  // dismiss
  const handleDismiss = () => {
    setVisible(false);
    if (onDismiss) onDismiss();
  };
  
  const colorSchemes = {
    error: { bg: "bg-red-50",
    border: "border-red-400", 
    text: "text-red-800", 
    icon: "text-red-500" 
  },
    warning: { bg: "bg-yellow-50", 
      border: "border-yellow-400", 
      text: "text-yellow-800", 
      icon: "text-yellow-500" 
    },
    info: { bg: "bg-blue-50", 
    border: "border-blue-400", 
    text: "text-blue-800", 
    icon: "text-blue-500" 
  },
  };
  
  const scheme = colorSchemes[severity] || colorSchemes.error;
  
 //animations
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: -50,  
      scale: 0.95  
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 400,  //fastness
        damping: 25,     //friction
        mass: 1,
        when: "beforeChildren", // parent first 
        staggerChildren: 0.1    // delay from the prev one
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.95,
      transition: { 
        type: "tween", 
        ease: "easeOut", 
        duration: 0.3 
      }
    }
  };
  
  const childVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300 
      }
    }
  };
  
  const iconVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.5, 
      rotate: -180 
    },
    visible: { 
      opacity: 1,
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20
      } 
    },
    pulse: {            //looping
      scale: [1, 1.1, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 3
      }
    }
  };
  
  return (
    <_motion.div
      className={`fixed top-4 right-4 max-w-md z-50`}
      initial="hidden" //start
      animate={visible ? "visible" : "exit"} //acticve
      exit="exit"   //exit
      variants={containerVariants}
      layout
    >
      <_motion.div 
        className={`flex items-start p-4 rounded-lg shadow-lg border ${scheme.bg} ${scheme.border}`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <_motion.div 
          className={`flex-shrink-0 mr-3 ${scheme.icon}`}
          variants={iconVariants}
          animate={["visible", "pulse"]}  //combination
        >
          <FaExclamationTriangle size={24} />
        </_motion.div>
        
        <div className="flex-grow">
          <_motion.h3 
            className={`text-lg font-semibold ${scheme.text}`}
            variants={childVariants}
          >
            Something went wrong
          </_motion.h3>
          
          <_motion.p 
            className={`mt-1 ${scheme.text}`}
            variants={childVariants}
          >
            {message || "Couldn't find the GitHub user. Please try again."}
          </_motion.p>
        </div>
        
        <_motion.button
          className={`ml-4 p-1 rounded-full opacity-70 hover:opacity-100 ${scheme.text}`}
          onClick={handleDismiss}
          whileHover={{ rotate: 90, scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <FaTimes size={16} />
        </_motion.button>
      </_motion.div>
    </_motion.div>
  );
};

export default ErrorMessage;