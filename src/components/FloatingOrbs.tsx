import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FloatingOrbs: React.FC = () => {
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orbs = orbsRef.current?.querySelectorAll('.floating-orb');
    
    if (orbs) {
      orbs.forEach((orb, index) => {
        // Set random initial positions
        gsap.set(orb, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        });

        // Create floating animation
        gsap.to(orb, {
          x: `+=${Math.random() * 200 - 100}`,
          y: `+=${Math.random() * 200 - 100}`,
          rotation: 360,
          duration: 10 + Math.random() * 10,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: index * 0.5
        });

        // Add subtle pulsing
        gsap.to(orb, {
          scale: 1.2,
          opacity: 0.8,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      });
    }

    // Handle mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const moveX = (clientX - centerX) * 0.02;
      const moveY = (clientY - centerY) * 0.02;
      
      gsap.to('.floating-orb', {
        x: `+=${moveX}`,
        y: `+=${moveY}`,
        duration: 2,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={orbsRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large primary orb */}
      <div className="floating-orb absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      
      {/* Medium secondary orb */}
      <div className="floating-orb absolute w-64 h-64 bg-secondary/15 rounded-full blur-2xl"></div>
      
      {/* Small accent orb */}
      <div className="floating-orb absolute w-48 h-48 bg-accent/12 rounded-full blur-xl"></div>
      
      {/* Tiny detail orbs */}
      <div className="floating-orb absolute w-32 h-32 bg-primary/8 rounded-full blur-lg"></div>
      <div className="floating-orb absolute w-24 h-24 bg-secondary/10 rounded-full blur-lg"></div>
      <div className="floating-orb absolute w-40 h-40 bg-accent/8 rounded-full blur-xl"></div>
      
      {/* Extra small particles */}
      <div className="floating-orb absolute w-16 h-16 bg-primary/15 rounded-full blur-md"></div>
      <div className="floating-orb absolute w-20 h-20 bg-secondary/12 rounded-full blur-md"></div>
      <div className="floating-orb absolute w-12 h-12 bg-accent/20 rounded-full blur-sm"></div>
      <div className="floating-orb absolute w-28 h-28 bg-primary/6 rounded-full blur-lg"></div>
    </div>
  );
};

export default FloatingOrbs;