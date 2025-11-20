import React from 'react';
import { EXPERIENCE } from '../constants';
import Section from './Section';
import { motion } from 'framer-motion';

const Experience: React.FC = () => {
  return (
    <Section title="Experience" id="experience">
      <div className="space-y-8 relative">
        {/* Continuous line */}
        <div className="absolute left-8 top-4 bottom-4 w-px bg-gradient-to-b from-indigo-200 via-slate-200 to-slate-100 md:left-1/2 md:-ml-[0.5px]" />
        
        {EXPERIENCE.map((job, index) => (
          <div key={index} className="relative flex flex-col md:flex-row items-start md:items-center md:justify-between group">
            
            {/* Timeline Dot */}
            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 z-10 mt-6 md:mt-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full border-[3px] border-indigo-500 relative z-10 shadow-sm group-hover:scale-125 transition-transform duration-300" />
              <div className="absolute w-full h-full bg-indigo-500/30 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            {/* Spacer for alternating layout */}
            <div className={`hidden md:block w-[calc(50%-2rem)] ${index % 2 === 0 ? 'order-1' : 'order-3'}`} />

            {/* Content Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`w-full pl-20 md:pl-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'order-3 md:text-left' : 'order-1 md:text-right'}`}
            >
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all duration-300 group-hover:-translate-y-1">
                <h3 className="font-bold text-lg text-slate-900">{job.role}</h3>
                <div className="text-indigo-600 font-medium mb-1">{job.company}</div>
                <div className="text-xs text-slate-400 font-mono mb-4 uppercase tracking-wide bg-slate-50 inline-block px-2 py-1 rounded">
                  {job.period} • {job.location}
                </div>
                <ul className={`space-y-2 ${index % 2 !== 0 ? 'md:flex md:flex-col md:items-end' : ''}`}>
                  {job.description.map((desc, i) => (
                    <li key={i} className="text-slate-600 text-sm leading-relaxed relative">
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Experience;