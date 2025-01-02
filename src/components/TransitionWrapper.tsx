import React, { useEffect, useState } from 'react';
import './TransitionWrapper.css';

const TransitionWrapper = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => {
      setIsVisible(false);
    };
  }, []);

  return (
    <div className={`transition-wrapper ${isVisible ? 'fade-in' : 'fade-out'}`}> 
      {children}
    </div>
  );
};

export default TransitionWrapper;
