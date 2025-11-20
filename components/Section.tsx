import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: ReactNode;
  id?: string;
  title?: string;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ children, id, title, className = "" }) => {
  return (
    <section id={id} className={`py-20 px-4 md:px-8 max-w-7xl mx-auto relative ${className}`}>
      {title && (
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-slate-800 relative inline-block"
        >
          {title}
          <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-indigo-500 rounded-full -mb-2"></span>
        </motion.h2>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
};

export default Section;