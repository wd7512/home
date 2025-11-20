import React from 'react';
import { SKILLS } from '../constants';
import Section from './Section';
import { motion, Variants } from 'framer-motion';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, scale: 0.5, y: 10 },
  show: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
};

const Skills: React.FC = () => {
  return (
    <Section title="Technical Arsenal" id="skills">
      <div className="grid md:grid-cols-3 gap-8">
        {SKILLS.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b-2 border-indigo-100 pb-2 inline-block">
              {category.name}
            </h3>
            <motion.div 
              className="flex flex-wrap gap-2"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              {category.skills.map((skill, i) => (
                <motion.span 
                  key={i}
                  variants={item}
                  className="px-3 py-1.5 bg-white text-slate-700 text-sm font-medium rounded-lg shadow-sm border border-slate-100 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md transition-all cursor-default select-none"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Skills;