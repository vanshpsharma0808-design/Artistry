import { useEffect, useRef } from 'react';

export const useBlendInOnScroll = (options = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    stagger = false,
    staggerDelay = 100
  } = options;

  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            if (stagger) {
              setTimeout(() => {
                entry.target.classList.add('visible');
              }, index * staggerDelay);
            } else {
              entry.target.classList.add('visible');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [threshold, rootMargin, stagger, staggerDelay]);

  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return { addToRefs };
};

export const useNavbarScroll = () => {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('[data-navbar]');
      if (!navbar) return;

      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};
