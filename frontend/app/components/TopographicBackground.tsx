'use client';

import React from 'react';

interface TopographicBackgroundProps {
  className?: string;
  animateHover?: boolean;
}

export const TopographicBackground: React.FC<TopographicBackgroundProps> = ({
  className = '',
  animateHover = true,
}) => {
  return (
    <div
      className={`relative w-full h-full overflow-hidden transition-all duration-700 ${className}`}
      style={{
        background: 'linear-gradient(135deg, rgb(var(--primary-rgb)), rgba(var(--secondary-rgb), 0.85))'
      }}
    >
      {/* Decorative radial glows for rich aesthetics */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#FFD700] blur-3xl opacity-30" />
      </div>

      {/* Topographic Contour Lines SVG */}
      <svg
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none select-none transition-transform duration-[2000ms] ease-out ${
          animateHover ? 'hover:scale-105' : ''
        }`}
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <g className="opacity-[0.16] dark:opacity-[0.25] stroke-white stroke-[1.5]" strokeLinecap="round">
          {/* Main Top-Left Contour Cluster (Memory Peak 1) */}
          <path
            d="M 150 150 C 180 160, 200 190, 180 220 C 160 250, 110 240, 90 210 C 70 180, 110 140, 150 150 Z"
            className="animate-spin-slow"
            style={{ transformOrigin: '140px 180px', animationDuration: '40s' }}
          />
          <path
            d="M 150 110 C 210 120, 240 170, 210 230 C 180 280, 90 270, 60 220 C 30 160, 80 100, 150 110 Z"
            className="animate-spin-slow"
            style={{ transformOrigin: '140px 180px', animationDuration: '45s', animationDirection: 'reverse' }}
          />
          <path
            d="M 150 70 C 240 80, 280 150, 240 240 C 190 320, 70 300, 30 230 C -10 160, 50 60, 150 70 Z"
            className="animate-pulse"
            style={{ animationDuration: '10s' }}
          />
          <path d="M 150 30 C 270 40, 320 130, 270 250 C 210 360, 50 330, 0 240 C -40 150, 20 20, 150 30 Z" />
          <path d="M 150 -10 C 300 -20, 360 110, 300 260 C 230 400, 30 360, -30 250 C -80 140, -10 -10, 150 -10 Z" />

          {/* Bottom-Right Contour Cluster (Memory Peak 2) */}
          <path
            d="M 650 650 C 680 660, 700 690, 680 720 C 660 750, 610 740, 590 710 C 570 680, 610 640, 650 650 Z"
            className="animate-pulse"
            style={{ animationDuration: '8s' }}
          />
          <path
            d="M 650 610 C 710 620, 740 670, 710 730 C 680 780, 590 770, 560 720 C 530 660, 580 600, 650 610 Z"
            className="animate-spin-slow"
            style={{ transformOrigin: '640px 680px', animationDuration: '30s' }}
          />
          <path d="M 650 570 C 740 580, 780 650, 740 740 C 690 820, 570 800, 530 730 C 490 660, 540 560, 650 570 Z" />
          <path d="M 650 530 C 770 540, 820 630, 770 750 C 710 860, 550 830, 500 740 C 450 650, 510 520, 650 530 Z" />
          <path d="M 650 490 C 800 500, 860 610, 800 760 C 730 890, 530 860, 470 750 C 410 640, 470 480, 650 490 Z" />

          {/* Center Swirling Lines (Connecting Memory Streams) */}
          <path d="M -100 450 C 100 400, 200 600, 400 500 C 600 400, 700 600, 900 550" />
          <path d="M -100 410 C 100 360, 200 560, 400 460 C 600 360, 700 560, 900 510" />
          <path d="M -100 370 C 100 320, 200 520, 400 420 C 600 320, 700 520, 900 470" />
          <path d="M -100 330 C 100 280, 200 480, 400 380 C 600 280, 700 480, 900 430" />
          
          {/* Extra organic wave details */}
          <path d="M 300 -100 C 450 -50, 400 150, 550 200 C 700 250, 750 450, 900 500" />
          <path d="M 340 -100 C 490 -50, 440 150, 590 200 C 740 250, 790 450, 940 500" />
        </g>
      </svg>
    </div>
  );
};
