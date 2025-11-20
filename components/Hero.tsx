import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PERSONAL_INFO } from '../constants';
import { Github, Linkedin, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  // Reduced tilt range slightly to prevent hit-test issues
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-visible perspective-1000">
      <motion.div
        className="relative z-10 max-w-4xl w-full mx-6 p-12 rounded-3xl bg-white/40 backdrop-blur-sm border border-white/60 shadow-2xl shadow-indigo-100/50"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Content Container - Pushed forward in Z-space to fix cursor flickering */}
        <div className="text-center relative transform-style-3d" style={{ transform: "translateZ(60px)" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
             <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-wider text-slate-500 uppercase bg-white/80 rounded-full border border-slate-200 shadow-sm">
              Machine Learning Researcher
            </span>
          </motion.div>
         
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-slate-800 to-slate-600">
              {PERSONAL_INFO.name}
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-10 font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {PERSONAL_INFO.title}
          </motion.p>

          <motion.div
            className="flex justify-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ transformStyle: "preserve-3d" }} 
          >
            <SocialLink href={PERSONAL_INFO.contact.linkedin} icon={<Linkedin size={22} />} label="LinkedIn" />
            <SocialLink href={PERSONAL_INFO.contact.github} icon={<Github size={22} />} label="GitHub" />
            <SocialLink href={`mailto:${PERSONAL_INFO.contact.email}`} icon={<Mail size={22} />} label="Email" />
          </motion.div>
        </div>
        
        {/* Glossy reflection effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
      </motion.div>

      {/* Simplified Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">Scroll</span>
          <div className="w-5 h-8 border-2 border-slate-300 rounded-full flex justify-center p-1">
            <motion.div 
                className="w-1 h-1.5 bg-slate-400 rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SocialLink: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-500 flex items-center justify-center"
    aria-label={label}
    whileHover={{ 
      scale: 1.1, 
      y: -5,
      color: "#4f46e5", 
      boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.15), 0 8px 10px -6px rgba(79, 70, 229, 0.1)"
    }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    {icon}
  </motion.a>
);

export default Hero;