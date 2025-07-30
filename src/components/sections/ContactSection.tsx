import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  PaperPlaneTilt, 
  GithubLogo, 
  LinkedinLogo, 
  TwitterLogo,
  Envelope,
  Phone,
  MapPin
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socialLinks = [
    { icon: <GithubLogo size={24} />, label: 'GitHub', href: '#', color: 'hover:text-primary' },
    { icon: <LinkedinLogo size={24} />, label: 'LinkedIn', href: '#', color: 'hover:text-blue-400' },
    { icon: <TwitterLogo size={24} />, label: 'Twitter', href: '#', color: 'hover:text-blue-500' },
  ];

  const contactInfo = [
    { icon: <Envelope size={20} />, label: 'Email', value: 'hello@abinash.dev' },
    { icon: <Phone size={20} />, label: 'Phone', value: '+1 (555) 123-4567' },
    { icon: <MapPin size={20} />, label: 'Location', value: 'San Francisco, CA' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo('.contact-title', 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.contact-title',
            start: 'top 80%',
          }
        }
      );

      // Form animation
      gsap.fromTo('.contact-form', 
        { opacity: 0, x: -50 },
        { 
          opacity: 1, 
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
          }
        }
      );

      // Contact info animation
      gsap.fromTo('.contact-info', 
        { opacity: 0, x: 50 },
        { 
          opacity: 1, 
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
          }
        }
      );

      // Form inputs animation
      gsap.fromTo('.form-input', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 70%',
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Animate button feedback
    gsap.to('.submit-btn', {
      scale: 1.05,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.out"
    });

    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="contact-title text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="contact-form">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-semibold mb-6 gradient-text">Send Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-input">
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div className="form-input">
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="form-input">
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn w-full btn-neon group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <PaperPlaneTilt size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="contact-info space-y-8">
            {/* Contact Details */}
            <div className="glass-card p-8">
              <h3 className="text-2xl font-semibold mb-6 gradient-text">Get In Touch</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{info.label}</div>
                      <div className="text-foreground font-medium">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-6 text-foreground">Follow Me</h3>
              
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-12 h-12 bg-muted/20 rounded-xl flex items-center justify-center text-muted-foreground ${social.color} transition-all duration-300 hover:scale-110 hover:bg-muted/30`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Availability</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-foreground">Available for new projects</span>
              </div>
              <p className="text-sm text-muted-foreground">
                I'm currently accepting new client work and interesting project collaborations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl"></div>
    </section>
  );
};

export default ContactSection;