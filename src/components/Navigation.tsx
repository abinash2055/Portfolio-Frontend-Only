import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { List, X } from 'phosphor-react';

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate navigation on mount
    gsap.fromTo('.nav-container', 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power2.out" }
    );
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    if (!isMobileMenuOpen) {
      // Open animation
      gsap.set('.mobile-menu', { display: 'flex' });
      gsap.fromTo('.mobile-menu',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo('.mobile-menu-item',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 0.1 }
      );
    } else {
      // Close animation
      gsap.to('.mobile-menu',
        { opacity: 0, scale: 0.95, duration: 0.3, ease: "power2.in",
          onComplete: () => gsap.set('.mobile-menu', { display: 'none' })
        }
      );
    }
  };

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  return (
    <>
      <nav className={`nav-container fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'glass backdrop-blur-strong' : ''
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold gradient-text cursor-pointer"
                 onClick={() => handleNavClick('#hero')}>
              Abinash
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(item.href)}
                  className="relative text-foreground hover:text-primary transition-colors duration-300 group"
                >
                  {item.label}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
                </button>
              ))}
              <button className="btn-neon ml-4">
                Hire Me
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="mobile-menu fixed inset-0 z-30 bg-background/95 backdrop-blur-strong hidden flex-col items-center justify-center">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => handleNavClick(item.href)}
            className="mobile-menu-item text-3xl font-light text-foreground hover:text-primary transition-colors duration-300 mb-8"
          >
            {item.label}
          </button>
        ))}
        <button className="mobile-menu-item btn-neon mt-4">
          Hire Me
        </button>
      </div>
    </>
  );
};

export default Navigation;