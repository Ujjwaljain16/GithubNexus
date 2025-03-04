import { motion as _motion}  from 'motion/react';
import { useEffect, useState } from 'react';

const AnimatedTitle = () => {
  const [completed, setCompleted] = useState(false);
  const title = "GitHub Nexus";
  const initialColor = "#24292e";
  const finalColor = "#0366d6";  

//set true after finished 
  useEffect(() => {
    const charAnimDuration = 160;
    const bufferDuration = 80;
    const totalAnimDuration = (title.length * charAnimDuration) + bufferDuration;
    const timer = setTimeout(() => {
      setCompleted(true);
    }, totalAnimDuration); 
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <h1 style={{ 
        display: "inline-block", 
        fontWeight: 600 
        }}>
      {title.split('').map((char, index) => {
        const charAnim = completed 
        ? { color: finalColor } 
        : { color: [
            initialColor,
            finalColor, 
            "#546e7a",
          ]
        };
        return (
        <_motion.span
          key={index}
          initial={{ color: "#24292e" }}
          animate={charAnim} 
          transition={{
            duration: 0.5,
            delay: completed 
            ? 0 
            : index * 0.15,
            ease: "easeOut",
          }}
          style={{ 
            display: "inline-block",
            whiteSpace: "pre"   //preserves all whitespace
          }}
        >
          {char}
        </_motion.span>
      );
      })}
    </h1>
  );
};

export default AnimatedTitle;