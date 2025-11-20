import React from 'react';
import { EDUCATION } from '../constants';
import Section from './Section';
import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';

const Education: React.FC = () => {
  return (
    <Section title="Education" id="education">
      <div className="grid md:grid-cols-2 gap-6">
        {EDUCATION.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                <GraduationCap size={24} />
              </div>
              <span className="text-xs font-mono text-slate-400 py-1 px-2 bg-slate-50 rounded">
                {edu.period}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-1">{edu.institution}</h3>
            <p className="text-indigo-600 font-medium mb-4">{edu.degree}</p>
            
            <div className="mb-6 inline-flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
              <Award size={14} className="text-amber-500" />
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">{edu.details}</span>
            </div>

            <ul className="space-y-2">
              {edu.achievements.map((item, i) => (
                <li key={i} className="text-sm text-slate-600 flex items-start gap-2.5">
                  <span className="block w-1.5 h-1.5 rounded-full bg-indigo-200 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Education;