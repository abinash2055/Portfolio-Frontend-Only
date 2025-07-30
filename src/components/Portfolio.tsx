import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import LoadingScreen from './LoadingScreen';
import Navigation from './Navigation';
import FloatingOrbs from './FloatingOrbs';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import Footer from './Footer';

gsap.registerPlugin(ScrollTrigger);

const Portfolio: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize smooth scrolling and animations after loading
    const initializeAnimations = () => {
      // Set up ScrollTrigger refresh
      ScrollTrigger.refresh();

      // Add scroll-based animations
      gsap.utils.toArray('.reveal').forEach((element: any) => {
        gsap.fromTo(element, 
          { 
            opacity: 0, 
            y: 50,
            filter: "blur(10px)"
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Parallax effect for floating elements
      gsap.utils.toArray('.parallax').forEach((element: any) => {
        gsap.to(element, {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });
    };

    if (!isLoading) {
      setTimeout(initializeAnimations, 100);
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    
    // Animate main content entrance
    gsap.fromTo('.main-content', 
      { opacity: 0, scale: 0.95 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1.5, 
        ease: "power2.out",
        delay: 0.2
      }
    );
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="main-content min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background floating orbs */}
      <FloatingOrbs />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Portfolio;