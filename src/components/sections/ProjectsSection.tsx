import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, GithubLogo, Globe } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Modern React-based shopping platform with 3D product previews and smooth animations.',
      image: '🛍️',
      tech: ['React', 'TypeScript', 'Three.js', 'Stripe'],
      category: 'Web App',
      link: '#',
      github: '#'
    },
    {
      id: 2,
      title: 'Portfolio Website',
      description: 'Interactive portfolio with GSAP animations and Spline 3D integration.',
      image: '💼',
      tech: ['React', 'GSAP', 'Spline', 'Tailwind'],
      category: 'Portfolio',
      link: '#',
      github: '#'
    },
    {
      id: 3,
      title: 'Dashboard Analytics',
      description: 'Real-time data visualization dashboard with beautiful charts and animations.',
      image: '📊',
      tech: ['Next.js', 'Chart.js', 'Framer Motion'],
      category: 'Dashboard',
      link: '#',
      github: '#'
    },
    {
      id: 4,
      title: 'Mobile App UI',
      description: 'Modern mobile interface design with smooth micro-interactions.',
      image: '📱',
      tech: ['React Native', 'Expo', 'Animated API'],
      category: 'Mobile',
      link: '#',
      github: '#'
    },
    {
      id: 5,
      title: 'AI Chat Interface',
      description: 'Intelligent chatbot interface with natural language processing.',
      image: '🤖',
      tech: ['React', 'OpenAI', 'Node.js', 'Socket.io'],
      category: 'AI/ML',
      link: '#',
      github: '#'
    },
    {
      id: 6,
      title: 'Gaming Platform',
      description: 'Interactive gaming platform with WebGL graphics and real-time multiplayer.',
      image: '🎮',
      tech: ['WebGL', 'Socket.io', 'Express', 'MongoDB'],
      category: 'Game',
      link: '#',
      github: '#'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo('.projects-title', 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.projects-title',
            start: 'top 80%',
          }
        }
      );

      // Project cards animation with stagger
      gsap.fromTo('.project-card', 
        { 
          opacity: 0, 
          y: 50,
          scale: 0.9,
          filter: "blur(10px)"
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="projects-title text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of my latest work, featuring cutting-edge technologies and innovative design solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="project-card glass-card group cursor-pointer relative overflow-hidden"
            >
              {/* Project Image/Icon */}
              <div className="relative h-48 mb-6 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-xl flex items-center justify-center overflow-hidden">
                <div className="text-6xl">{project.image}</div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
                  <a 
                    href={project.link}
                    className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                  >
                    <Globe size={20} className="text-white" />
                  </a>
                  <a 
                    href={project.github}
                    className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                  >
                    <GithubLogo size={20} className="text-white" />
                  </a>
                </div>

                {/* Category tag */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-primary/20 backdrop-blur rounded-full text-sm text-primary font-medium">
                  {project.category}
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <ArrowUpRight 
                    size={20} 
                    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" 
                  />
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-muted/20">
                  {project.tech.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 text-xs bg-muted/20 text-muted-foreground rounded-full hover:bg-primary/20 hover:text-primary transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-16">
          <button className="btn-neon group">
            <span className="flex items-center gap-2">
              View All Projects
              <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </button>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-24 h-24 bg-secondary/5 rounded-full blur-2xl"></div>
    </section>
  );
};

export default ProjectsSection;