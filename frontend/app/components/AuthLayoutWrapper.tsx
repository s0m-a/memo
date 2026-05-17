'use client';

import React, { useState, useEffect } from 'react';
import { TopographicBackground } from './TopographicBackground';

interface AuthLayoutWrapperProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  isPending?: boolean;
}

export const AuthLayoutWrapper: React.FC<AuthLayoutWrapperProps> = ({
  title,
  subtitle,
  children,
  footer,
  isPending = false,
}) => {
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  // Check if user has already visited onboarding in the current session
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('memo_visited_welcome');
    if (hasVisited === 'true') {
      setShowWelcome(false);
    }
  }, []);

  const handleContinue = () => {
    setShowWelcome(false);
    sessionStorage.setItem('memo_visited_welcome', 'true');
  };

  const handleBackToWelcome = () => {
    setShowWelcome(true);
    sessionStorage.removeItem('memo_visited_welcome');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-0 md:p-6 bg-slate-50 dark:bg-slate-950 relative overflow-hidden font-sans">
      {/* Background Mesh */}
      <div className="mesh-background" aria-hidden="true" />

      {/* Main Container Card */}
      <div className="w-full min-h-screen md:min-h-0 md:max-w-5xl md:h-[680px] bg-white dark:bg-slate-900 md:rounded-[3rem] relative overflow-hidden shadow-2xl flex flex-col md:flex-row border border-slate-100 dark:border-slate-800/80 transition-all duration-500">
        
        {/* DESKTOP VIEW: Left branding column (42% width) */}
        <div className="hidden md:block md:w-[42%] h-full relative overflow-hidden">
          <TopographicBackground animateHover={true} />
          
          {/* Logo & Welcome Text overlay */}
          <div className="absolute inset-0 p-12 flex flex-col justify-between text-white z-10">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center font-black text-xl shadow-lg transition-transform duration-300 hover:rotate-12 hover:scale-110" style={{ color: 'var(--primary)' }}>
                M
              </div>
              <span className="text-2xl font-extrabold tracking-widest font-display uppercase">MEMO</span>
            </div>

            {/* Brand Poetic Copy */}
            <div className="space-y-4">
              <h2 className="text-4xl font-extrabold leading-tight tracking-tight font-display">
                Welcome to Memo
              </h2>
              <p className="text-white/80 text-sm leading-relaxed font-light">
                Chart the beautiful landscape of your life. Every step, every emotion, and every cherishable moment, beautifully preserved.
              </p>
            </div>
            
            {/* Subtle credit / copyright */}
            <div className="text-xs text-white/50 font-medium">
              © {new Date().getFullYear()} Memo Inc. All rights reserved.
            </div>
          </div>

          {/* Desktop Vertical Wave Carve-Out (Blends into the right white/slate pane) */}
          <div className="absolute top-0 right-0 h-full w-16 translate-x-[1px] z-10 text-white dark:text-slate-900 fill-current pointer-events-none">
            <svg viewBox="0 0 100 680" preserveAspectRatio="none" className="w-full h-full">
              <path d="M100,0 L60,0 C60,180 10,280 40,420 C55,490 60,570 60,680 L100,680 Z" />
            </svg>
          </div>
        </div>


        {/* MOBILE VIEW & TRANSITION: Top header section */}
        <div
          className={`md:hidden relative w-full overflow-hidden transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) z-10 ${
            showWelcome ? 'h-[55vh]' : 'h-[25vh]'
          }`}
        >
          <TopographicBackground animateHover={false} />

          {/* Logo overlay on Mobile */}
          <div className="absolute top-8 left-8 flex items-center gap-2.5 text-white z-20">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-black text-sm shadow-md" style={{ color: 'var(--primary)' }}>
              M
            </div>
            <span className="text-lg font-extrabold tracking-widest font-display uppercase">MEMO</span>
          </div>

          {/* Back to Welcome button (Only when showing Form on mobile) */}
          {!showWelcome && (
            <button
              onClick={handleBackToWelcome}
              className="absolute top-8 right-8 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white hover:bg-white/30 active:scale-95 transition-all z-20"
              title="Go back to intro"
            >
              <svg className="w-4 h-4" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Mobile Horizontal Wave (Blends top header into bottom form area) */}
          <div className="absolute bottom-0 left-0 w-full translate-y-[2px] text-white dark:text-slate-900 fill-current pointer-events-none transition-colors duration-500">
            <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-16">
              <path d="M0,80 C120,80 180,20 280,70 C360,110 430,90 500,100 L500,150 L0,150 Z" />
            </svg>
          </div>
        </div>


        {/* DESKTOP (Right Column) & MOBILE (Bottom Area) */}
        <div className="flex-1 h-full relative overflow-hidden flex flex-col justify-center">
          
          {/* MOBILE ONLY: Welcome text and Continue CTA */}
          <div
            className={`md:hidden px-8 pb-10 flex flex-col justify-between flex-1 transition-all duration-500 ${
              showWelcome ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-10 scale-95 pointer-events-none absolute inset-x-0 bottom-0'
            }`}
          >
            {/* Poetic description */}
            <div className="mt-8 space-y-3">
              <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight font-display">
                Welcome
              </h2>
              <p className="text-slate-400 dark:text-slate-500 text-sm leading-relaxed font-medium">
                Chart the beautiful landscape of your life. Every step, every emotion, and every cherishable moment, beautifully preserved.
              </p>
            </div>

            {/* Continue Button Container */}
            <div className="flex justify-end items-center mt-12">
              <button
                onClick={handleContinue}
                className="group flex items-center gap-3 cursor-pointer select-none"
              >
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                  Continue
                </span>
                <div className="w-11 h-11 rounded-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] flex items-center justify-center text-white shadow-lg shadow-[var(--primary)]/20 transition-all group-active:scale-95 group-hover:translate-x-1">
                  <svg className="w-5 h-5 stroke-[2.5]" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* ACTIVE AUTH FORM PANEL: Mobile form or Desktop right column */}
          <div
            className={`px-8 md:px-16 py-10 md:py-12 flex flex-col justify-center flex-1 transition-all duration-500 ${
              !showWelcome || typeof window !== 'undefined' && window.innerWidth >= 768
                ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                : 'opacity-0 translate-y-10 scale-95 pointer-events-none absolute inset-x-0 bottom-0 md:relative md:opacity-100 md:translate-y-0 md:scale-100 md:pointer-events-auto'
            }`}
          >
            {/* Title with custom thick bottom accent line */}
            <div className="relative mb-8 select-none">
              <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight font-display font-bold">
                {title}
              </h1>
              <div className="absolute bottom-[-8px] left-0 w-12 h-1.5 bg-[var(--primary)] rounded-full shadow-sm shadow-[var(--primary)]/30" />
            </div>

            <p className="text-slate-400 dark:text-slate-500 text-sm font-semibold mb-8 select-none">
              {subtitle}
            </p>

            {/* Inner Form Fields & Controls */}
            <div className="flex-grow flex flex-col justify-center">
              {children}
            </div>

            {/* Form Footer (Links) */}
            <div className="mt-8 text-center text-sm font-semibold">
              {footer}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
