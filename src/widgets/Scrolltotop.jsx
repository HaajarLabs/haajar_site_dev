import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 200 });
    setTimeout(() => {
      AOS.refresh();
    }, 500); // Delay to ensure AOS has time to initialize
  }, [pathname]);

  return null;
};

export default ScrollToTop;
