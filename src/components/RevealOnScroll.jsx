import { useState, useEffect, useRef } from 'react';

export const RevealOnScroll = ({ children }) => {
  const domRef = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setVisible(true);
      });
    }, { threshold: 0.1 });

    const current = domRef.current;
    observer.observe(current);
    return () => observer.unobserve(current);
  }, []);

  return (
    <div ref={domRef} className={`reveal-section ${isVisible ? 'visible' : ''}`}>
      {children}
    </div>
  );
};
