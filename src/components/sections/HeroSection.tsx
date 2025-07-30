import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Download } from 'phosphor-react';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 1 });

      // Animate headline
      tl.fromTo('.hero-headline', 
        { opacity: 0, y: 50, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power2.out" }
      );

      // Animate subtitle
      tl.fromTo('.hero-subtitle', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.6"
      );

      // Animate buttons
      tl.fromTo('.hero-buttons', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.4"
      );

      // Animate Spline container from right
      tl.fromTo('.spline-container', 
        { opacity: 0, x: 100, scale: 0.8 },
        { opacity: 1, x: 0, scale: 1, duration: 1.5, ease: "power2.out" },
        "-=1"
      );

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleHireMe = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadCV = () => {
    // Add your CV download logic here
    console.log('Download CV clicked');
  };

  return (
    <section id="hero" ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="hero-headline text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              Hi, I'm{' '}
              <span className="gradient-text">Abinash</span>
              <br />
              <span className="text-3xl md:text-5xl lg:text-6xl text-muted-foreground font-light">
                Web Developer
              </span>
            </h1>

            <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground font-light max-w-2xl leading-relaxed">
              I craft immersive digital experiences with cutting-edge technologies, 
              transforming ideas into stunning, interactive web applications.
            </p>
          </div>

          <div className="hero-buttons flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleHireMe}
              className="btn-neon group"
            >
              <span className="flex items-center gap-2">
                Hire Me
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </span>
            </button>

            <button 
              onClick={handleDownloadCV}
              className="px-8 py-4 border border-muted-foreground/30 text-muted-foreground hover:text-foreground hover:border-foreground/50 rounded-xl transition-all duration-300 flex items-center gap-2 group"
            >
              <Download size={20} className="transition-transform group-hover:translate-y-1" />
              Download CV
            </button>
          </div>

          {/* Quick stats */}
          <div className="flex gap-8 pt-8 border-t border-muted/20">
            <div>
              <div className="text-2xl font-bold gradient-text">5+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <div className="text-2xl font-bold gradient-text">50+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold gradient-text">100%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Right Content - Spline 3D */}
        <div className="spline-container relative">
          <div className="relative w-full h-[600px] rounded-3xl overflow-hidden glass-card">
            {/* Spline Embed */}
            <iframe 
              src="https://my.spline.design/untitled-503c2c99b4b58e53e74a6e9b89b7d0d1/" 
              frameBorder="0" 
              width="100%" 
              height="100%"
              className="rounded-3xl"
            ></iframe>
            
            {/* Overlay effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none rounded-3xl"></div>
            
            {/* Floating elements around the 3D model */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/30 rounded-full blur-md animate-pulse-neon"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent/40 rounded-full blur-sm animate-pulse-neon"></div>
            <div className="absolute top-1/2 -right-6 w-4 h-4 bg-secondary/50 rounded-full blur-sm animate-pulse-neon"></div>
          </div>

          {/* Additional floating elements */}
          <div className="absolute top-10 -left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-10 -right-10 w-16 h-16 bg-secondary/10 rounded-full blur-lg animate-float-delayed"></div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;