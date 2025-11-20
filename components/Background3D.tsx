import React from 'react';

const Background3D: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-50 pointer-events-none perspective-container">
      <style>{`
        .perspective-container {
          perspective: 1000px;
        }
        .grid-3d {
          position: absolute;
          width: 200%;
          height: 200%;
          left: -50%;
          top: -25%;
          background-image: 
            linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
          background-size: 60px 60px;
          transform: rotateX(45deg) translateZ(-100px);
          transform-origin: 50% 0%;
          mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
        }
        /* Soft colored orbs for depth */
        .orb-1 {
            position: absolute;
            top: -10%;
            right: -5%;
            width: 60vw;
            height: 60vw;
            background: radial-gradient(circle, rgba(79, 70, 229, 0.08) 0%, rgba(255, 255, 255, 0) 70%);
            mix-blend-mode: multiply;
        }
        .orb-2 {
            position: absolute;
            bottom: -10%;
            left: -10%;
            width: 50vw;
            height: 50vw;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(255, 255, 255, 0) 70%);
            mix-blend-mode: multiply;
        }
      `}</style>
      
      {/* Colored gradients for depth */}
      <div className="orb-1" />
      <div className="orb-2" />

      {/* 3D Perspective Grid - purely CSS, GPU accelerated */}
      <div className="grid-3d" />
      
      {/* Subtle grain for texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
    </div>
  );
};

export default Background3D;