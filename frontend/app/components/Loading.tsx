'use client'
import React from 'react';

export const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-white/40 dark:bg-slate-900/40 backdrop-blur-md transition-all duration-500">
      <div className="relative">
    
        <div className="absolute inset-0 rounded-3xl bg-theme-gradient blur-xl opacity-40 animate-pulse scale-150" />
       
        <div className="relative w-24 h-24 bg-theme-gradient rounded-[2rem] flex items-center justify-center text-white font-black text-4xl shadow-2xl animate-bounce-slow">
          M
          {/* Subtle spinning border */}
          <div className="absolute inset-0 rounded-[2rem] border-4 border-white/20 animate-spin-slow" />
        </div>
        
        {/* Glowing dots */}
        <div className="flex gap-2 justify-center mt-12">
          <div className="w-2.5 h-2.5 rounded-full bg-theme-gradient animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2.5 h-2.5 rounded-full bg-theme-gradient animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2.5 h-2.5 rounded-full bg-theme-gradient animate-bounce" />
        </div>
      </div>
    </div>
  );
};
