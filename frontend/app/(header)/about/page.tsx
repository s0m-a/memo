import React from 'react'

const About = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="glass-card p-12 md:p-20 rounded-[3.5rem] max-w-3xl w-full">
        <div className="w-20 h-20 bg-theme-gradient rounded-3xl flex items-center justify-center text-white text-3xl font-black mb-8 mx-auto shadow-xl transition-all duration-500 hover:rotate-6 hover:scale-110" style={{ boxShadow: '0 15px 30px -10px rgba(var(--primary-rgb), 0.3)' }}>
          M
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
          About <span className="text-theme-gradient">Memo</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-xl font-medium mb-12 leading-relaxed">
          A project dedicated to preserving life's most precious moments in a beautiful, simple, and lasting way.
        </p>
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
          <p className="text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] font-bold text-sm mb-2">Created By</p>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Ogbenna Nmesoma Anita</h2>
        </div>
      </div>
    </div>
  )
}

export default About
