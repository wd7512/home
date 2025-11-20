import React, { useEffect, useState } from 'react';
import Background3D from './components/Background3D';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Education from './components/Education';
import Research from './components/Research';
import Projects from './components/Projects';
import Skills from './components/Skills';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="relative min-h-screen text-slate-900 overflow-hidden">
      <Background3D />
      
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="font-bold text-xl tracking-tighter cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            WD<span className="text-indigo-600">.</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {['Experience', 'Research', 'Projects', 'Education'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollTo(item.toLowerCase())}
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-white flex flex-col items-center justify-center gap-8 md:hidden">
          {['Experience', 'Research', 'Projects', 'Education'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-2xl font-light text-slate-900"
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <main className="relative z-10">
        <Hero />
        <Research />
        <Experience />
        <Projects />
        <Education />
        <Skills />
        
        {/* Footer */}
        <footer className="py-12 text-center text-slate-500 text-sm mt-20 border-t border-slate-200 bg-slate-50/50 backdrop-blur-sm">
          <p>© {new Date().getFullYear()} William Dennis. Built with React & Tailwind.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;