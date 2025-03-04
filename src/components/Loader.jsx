import { motion as _motion } from 'motion/react';

const Loader = () => {
  const pulseRingVariants = {
    initial: { opacity: 0.3, scale: 0.8 },
    animate: { 
      opacity: [0.3, 0.8, 0.3],  //fade-in/out 
      scale: [0.8, 1.1, 0.8],    //grow/shrink
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Rotation
  const rotateIconVariants = {
    initial: { rotate: 0 },
    animate: { 
      rotate: 360,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"   //constant speed
      }
    }
  };

  // Text animation
  const textVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Dots animation
  const dotsVariants = {
    initial: { opacity: 0 },
    animate: (i) => ({
      opacity: [0, 1, 0],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        delay: i * 0.2,  //delay each dot
        ease: "easeInOut"
      }
    })
  };

  return (
    <div className="loader-container">
      <div className="loader-content">
        <_motion.div 
          className="loader-ring"
          variants={pulseRingVariants}
          initial="initial"
          animate="animate"
          style={{
            position: "absolute",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "rgba(66, 133, 244, 0.2)"
          }}
        />

        <_motion.div
          className="loader-icon"
          variants={rotateIconVariants}
          initial="initial"
          animate="animate"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24" //24*24
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path /*outline*/
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
              fill="#4285F4"
            />
            <path /*three dots*/
              d="M12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11Z"
              fill="#4285F4"
            />
            <path 
              d="M16 11C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13C15.4477 13 15 12.5523 15 12C15 11.4477 15.4477 11 16 11Z"
              fill="#4285F4"
            />
            <path
              d="M8 11C8.55228 11 9 11.4477 9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11Z"
              fill="#4285F4"
            />
          </svg>
        </_motion.div>
        
        <_motion.div 
          className="loader-text"
          variants={textVariants}
          initial="initial"
          animate="animate"
          style={{
            marginTop: "24px",
            fontWeight: 500,
            display: "flex",
            alignItems: "center"
          }}
        >
          <span>Searching for user</span>
          {[0, 1, 2].map((i) => (
            <_motion.span 
              key={i}
              custom={i} //passingh
              variants={dotsVariants}
              initial="initial"
              animate="animate"
              style={{ marginLeft: "2px" }}
            >
              .
            </_motion.span>
          ))}
        </_motion.div>
      </div>
    </div>
  );
};
export default Loader;