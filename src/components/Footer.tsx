import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, GithubLogo, LinkedinLogo, TwitterLogo } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  const quickLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { icon: <GithubLogo size={20} />, href: '#' },
    { icon: <LinkedinLogo size={20} />, href: '#' },
    { icon: <TwitterLogo size={20} />, href: '#' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer animation
      gsap.fromTo('.footer-content', 
        { opacity: 0, y: 60 },
        { 
          opacity: 1, 
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.footer-content',
            start: 'top 90%',
          }
        }
      );

      // Floating particles animation
      gsap.to('.footer-particle', {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.5
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer ref={footerRef} className="relative py-16 border-t border-border/50 overflow-hidden">
      {/* Background floating particles */}
      <div className="absolute inset-0">
        <div className="footer-particle absolute top-1/4 left-1/4 w-6 h-6 bg-primary/20 rounded-full blur-sm"></div>
        <div className="footer-particle absolute top-3/4 right-1/4 w-4 h-4 bg-secondary/20 rounded-full blur-sm"></div>
        <div className="footer-particle absolute bottom-1/4 left-3/4 w-8 h-8 bg-accent/15 rounded-full blur-md"></div>
        <div className="footer-particle absolute top-1/2 left-1/6 w-5 h-5 bg-primary/15 rounded-full blur-sm"></div>
        <div className="footer-particle absolute bottom-1/3 right-1/6 w-3 h-3 bg-secondary/25 rounded-full blur-sm"></div>
      </div>

      <div className="footer-content container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gradient-text">Abinash</h3>
            <p className="text-muted-foreground leading-relaxed">
              Crafting immersive digital experiences with cutting-edge technologies. 
              Let's build the future of web together.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-muted/20 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Let's Talk</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>hello@abinash.dev</p>
              <p>+1 (555) 123-4567</p>
              <p>San Francisco, CA</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400">Available for work</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              Made with <Heart size={16} className="text-red-400" /> by Abinash
            </p>
            
            <p className="text-muted-foreground text-sm">
              © 2024 Abinash. All rights reserved.
            </p>
          </div>
        </div>

        {/* Scroll to top button */}
        <button
          onClick={() => handleNavClick('#hero')}
          className="absolute bottom-8 right-8 w-12 h-12 bg-primary/20 backdrop-blur rounded-full flex items-center justify-center text-primary hover:bg-primary/30 transition-all duration-300 group"
        >
          <div className="transform rotate-90 transition-transform group-hover:-translate-x-1">→</div>
        </button>
      </div>
    </footer>
  );
};

export default Footer;