import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Palette, 
  Code, 
  DeviceTabletSpeaker, 
  Lightning, 
  Globe, 
  Rocket,
  Database,
  Cube
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const skills = [
    { icon: <Code size={24} />, name: 'React/Next.js', level: 95 },
    { icon: <Palette size={24} />, name: 'UI/UX Design', level: 90 },
    { icon: <Lightning size={24} />, name: 'TypeScript', level: 88 },
    { icon: <DeviceTabletSpeaker size={24} />, name: 'Responsive Design', level: 95 },
    { icon: <Globe size={24} />, name: 'Web Animation', level: 92 },
    { icon: <Database size={24} />, name: 'Backend Dev', level: 85 },
    { icon: <Rocket size={24} />, name: 'Performance', level: 90 },
    { icon: <Cube size={24} />, name: '3D Integration', level: 80 }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Profile image animation
      gsap.fromTo('.profile-image', 
        { 
          opacity: 0, 
          x: -50, 
          scale: 0.8,
          filter: "blur(10px)"
        },
        { 
          opacity: 1, 
          x: 0, 
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.profile-image',
            start: 'top 80%',
            end: 'bottom 20%',
          }
        }
      );

      // Bio text animation
      gsap.fromTo('.bio-text', 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.bio-text',
            start: 'top 80%',
          }
        }
      );

      // Skills animation with stagger
      gsap.fromTo('.skill-item', 
        { 
          opacity: 0, 
          y: 30,
          scale: 0.8
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
          }
        }
      );

      // Skill progress bars
      gsap.fromTo('.skill-progress', 
        { width: '0%' },
        { 
          width: (index, target) => target.dataset.level + '%',
          duration: 1.5,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 60%',
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate about creating digital experiences that blend cutting-edge technology 
            with exceptional design and performance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Profile Image */}
          <div className="profile-image relative">
            <div className="relative w-80 h-80 mx-auto">
              {/* Main image container with glass effect */}
              <div className="glass-card w-full h-full rounded-full overflow-hidden relative group">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 flex items-center justify-center">
                  <div className="text-8xl text-muted-foreground/30">👨‍💻</div>
                </div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
              </div>

              {/* Floating elements around image */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/40 rounded-full blur-sm animate-pulse-neon"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent/50 rounded-full blur-sm animate-pulse-neon"></div>
              <div className="absolute top-1/4 -left-6 w-4 h-4 bg-secondary/60 rounded-full blur-sm animate-pulse-neon"></div>
              <div className="absolute bottom-1/4 -right-6 w-5 h-5 bg-primary/30 rounded-full blur-sm animate-pulse-neon"></div>
            </div>
          </div>

          {/* Right: Bio & Skills */}
          <div className="space-y-8">
            <div className="bio-text space-y-6">
              <h3 className="text-2xl font-semibold gradient-text">
                Crafting the Future of Web
              </h3>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  With over 5 years of experience in web development, I specialize in creating 
                  immersive digital experiences that push the boundaries of what's possible on the web.
                </p>
                
                <p>
                  My passion lies in combining modern technologies like React, GSAP, and 3D graphics 
                  to build applications that are not just functional, but truly captivating.
                </p>
                
                <p>
                  I believe in the power of clean code, elegant design, and seamless user experiences 
                  to transform how people interact with technology.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="skills-grid">
              <h4 className="text-xl font-semibold mb-6 text-foreground">Technical Expertise</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="skill-item glass p-4 rounded-xl group hover:glow-primary transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-primary group-hover:text-accent transition-colors">
                        {skill.icon}
                      </div>
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <span className="ml-auto text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                      <div 
                        className="skill-progress h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                        data-level={skill.level}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;