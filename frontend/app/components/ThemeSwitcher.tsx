'use client'
import React from 'react';
import { useTheme } from './ThemeProvider';
import { SwatchIcon } from '@heroicons/react/24/outline';

const themes = [
  { id: 'default', color: '#6366f1', label: 'Indigo' },
  { id: 'emerald', color: '#10b981', label: 'Emerald' },
  { id: 'rose', color: '#f43f5e', label: 'Rose' },
  { id: 'amber', color: '#f59e0b', label: 'Amber' },
  { id: 'midnight', color: '#4f46e5', label: 'Midnight' },
] as const;

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-300 active:scale-95 border border-white/10 dark:border-white/5"
        title="Change Theme"
      >
        <SwatchIcon className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-indigo-500 transition-colors" />
        <div 
          className="w-3 h-3 rounded-full shadow-sm" 
          style={{ backgroundColor: themes.find(t => t.id === theme)?.color }} 
        />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-[60]" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute right-0 mt-3 w-48 glass-card rounded-[2rem] p-3 z-[70] animate-in fade-in zoom-in duration-200">
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-3 px-3">Select Theme</p>
            <div className="grid grid-cols-1 gap-1">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                    theme === t.id 
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <div 
                    className="w-4 h-4 rounded-full border border-white/20 shadow-sm" 
                    style={{ backgroundColor: t.color }} 
                  />
                  <span className="text-sm font-bold">{t.label}</span>
                  {theme === t.id && (
                    <div className="ml-auto w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
