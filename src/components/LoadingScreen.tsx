import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate the progress bar
    tl.to({}, {
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function() {
        const prog = Math.round(this.progress() * 100);
        setProgress(prog);
      }
    });

    // Animate logo entrance
    tl.fromTo(".loading-logo", 
      { opacity: 0, scale: 0.8, filter: "blur(10px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1 },
      0
    );

    // Animate loading text
    tl.fromTo(".loading-text", 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      0.5
    );

    // Complete loading and trigger exit
    tl.call(() => {
      setTimeout(() => {
        // Exit animation
        gsap.timeline()
          .to(".progress-bar", {
            scaleX: 0,
            transformOrigin: "right",
            duration: 0.5,
            ease: "power2.in"
          })
          .to(".preloader", {
            opacity: 0,
            scale: 0.9,
            filter: "blur(10px)",
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
              onComplete();
            }
          }, "-=0.3");
      }, 800);
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="preloader fixed inset-0 z-50 flex items-center justify-center bg-background">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-secondary/20 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute bottom-1/4 left-3/4 w-40 h-40 bg-accent/15 rounded-full blur-xl animate-float-slow"></div>
      </div>

      <div className="text-center relative z-10">
        {/* Logo/Name */}
        <div className="loading-logo mb-8">
          <h1 className="text-6xl md:text-8xl font-bold gradient-text mb-4">
            Abinash
          </h1>
          <p className="loading-text text-xl text-muted-foreground font-light tracking-wider">
            Web Developer
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative w-80 h-1 bg-muted/30 rounded-full mx-auto mb-4 overflow-hidden">
          <div 
            className="progress-bar absolute top-0 left-0 h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: 'var(--gradient-primary)',
              boxShadow: '0 0 20px hsl(var(--primary) / 0.5)'
            }}
          ></div>
        </div>

        {/* Progress Text */}
        <div className="text-sm text-muted-foreground font-mono">
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;