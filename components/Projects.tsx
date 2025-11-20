import React from 'react';
import { PERSONAL_PROJECTS } from '../constants';
import Section from './Section';
import { motion } from 'framer-motion';
import { Code, ArrowUpRight } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <Section title="Personal Projects" id="projects">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PERSONAL_PROJECTS.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <motion.div 
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="p-2.5 bg-slate-50 rounded-xl text-slate-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300"
              >
                <Code size={20} />
              </motion.div>
              {project.link && (
                <a href={project.link} className="text-slate-300 hover:text-indigo-600 transition-colors p-1">
                  <ArrowUpRight size={20} />
                </a>
              )}
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
            <p className="text-slate-600 text-sm mb-6 flex-grow leading-relaxed">
              {project.description}
            </p>
            
            <div className="pt-4 border-t border-slate-100 mt-auto">
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-indigo-50/50 border border-indigo-100/50 rounded text-indigo-900/70">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-xs text-slate-400 font-mono text-right">
                {project.year}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Projects;