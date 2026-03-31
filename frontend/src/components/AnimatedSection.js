import React from 'react';
import { useBlendInOnScroll } from '../hooks/useAnimations';

const AnimatedSection = ({ 
  children, 
  className = '', 
  stagger = false,
  staggerDelay = 100,
  as: Component = 'div',
  ...props 
}) => {
  const { addToRefs } = useBlendInOnScroll({ stagger, staggerDelay });

  if (stagger && React.Children.count(children) > 1) {
    return (
      <Component className={className} {...props}>
        {React.Children.map(children, (child, index) => (
          <div
            ref={addToRefs}
            className="stagger-item"
            style={{ transitionDelay: `${index * staggerDelay}ms` }}
          >
            {child}
          </div>
        ))}
      </Component>
    );
  }

  return (
    <Component
      ref={addToRefs}
      className={`blend-in ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default AnimatedSection;
