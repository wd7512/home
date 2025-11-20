import React from 'react';
import { PUBLICATIONS, RESEARCH_PROJECTS } from '../constants';
import Section from './Section';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, ArrowRight, ExternalLink } from 'lucide-react';

const Research: React.FC = () => {
  return (
    <Section title="Research & Publications" id="research">
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Publications Column */}
        <div className="lg:col-span-7">
          <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <BookOpen size={18} />
            Publications
          </h3>
          <div className="space-y-4">
            {PUBLICATIONS.map((pub, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl border-l-4 border-l-indigo-500 shadow-sm border-y border-r border-slate-100 hover:shadow-md transition-all relative group"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                  <h4 className="text-lg font-bold text-slate-900 leading-tight">
                    {pub.link ? (
                      <a href={pub.link} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors inline-flex items-center gap-2">
                        {pub.title}
                        <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                      </a>
                    ) : (
                      pub.title
                    )}
                  </h4>
                  <span className={`shrink-0 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${pub.status === 'Published' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                    {pub.status}
                  </span>
                </div>
                <p className="text-slate-600 text-sm mb-2">{pub.authors}</p>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-50">
                    <p className="text-indigo-600 text-xs font-semibold uppercase tracking-wide">{pub.venue}</p>
                    <span className="text-xs text-slate-400 font-mono">{pub.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Research Projects Column */}
        <div className="lg:col-span-5">
          <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Sparkles size={18} />
            Highlights
          </h3>
          <div className="space-y-4">
            {RESEARCH_PROJECTS.map((proj, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"
              >
                <div className="flex justify-between items-baseline mb-2">
                   <h4 className="text-base font-bold text-slate-900">{proj.title}</h4>
                   <span className="text-xs text-slate-400 font-mono">{proj.year}</span>
                </div>
                <p className="text-slate-600 text-sm mb-3 leading-relaxed">{proj.description}</p>
                
                {/* Links Section */}
                {proj.links && proj.links.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {proj.links.map((link, i) => (
                      <a 
                        key={i} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded hover:bg-indigo-100 transition-colors"
                      >
                        {link.label}
                        <ExternalLink size={10} />
                      </a>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] uppercase tracking-wide rounded font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-6 p-6 bg-gradient-to-br from-slate-900 to-indigo-900 rounded-xl text-white shadow-lg"
            >
                <h4 className="text-lg font-bold mb-2">Academic Collaboration</h4>
                <p className="text-slate-300 mb-4 text-sm leading-relaxed">
                    Interested in this work? I am open to academic collaborations and discussing research regarding robust AI systems.
                </p>
                <a href="mailto:wwdennis.home@gmail.com" className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:text-indigo-200 transition-colors group">
                    Get in touch <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
            </motion.div>
          </div>
        </div>

      </div>
    </Section>
  );
};

export default Research;