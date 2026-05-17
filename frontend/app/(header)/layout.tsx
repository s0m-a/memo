"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NavLinks from "../navLink";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function HeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
    <div className="relative">
      <header className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-6 py-4">
        <div className="max-w-7xl mx-auto glass-card rounded-[2.5rem] px-6 md:px-8 py-4 md:py-5 flex justify-between items-center bg-white/60 dark:bg-slate-900/40 backdrop-blur-2xl border-white/40 dark:border-white/10 shadow-2xl shadow-indigo-500/10">
          <div 
            onClick={() => {
              router.push('/');
              setIsMenuOpen(false);
            }}
            className="cursor-pointer group flex items-center gap-3"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 bg-theme-gradient rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" style={{ boxShadow: '0 10px 20px -5px rgba(var(--primary-rgb), 0.4)' }}>
              M
            </div>
            <h3 className="uppercase text-xl md:text-2xl tracking-tighter text-slate-900 dark:text-white font-extrabold group-hover:text-theme-primary transition-colors">
              memo
            </h3>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-4">
              <ThemeSwitcher />
              <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800" />
              <NavLinks />
            </div>

            <div className="md:hidden flex items-center gap-2">
               <ThemeSwitcher />
               <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 active:scale-90 transition-all"
               >
                {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
               </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-[-1] pt-32 px-4 pb-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="glass-card rounded-[3rem] p-8 flex flex-col gap-6 shadow-2xl border-white/20">
              <p className="text-xs uppercase tracking-[0.2em] font-black text-slate-400 mb-2">Navigation</p>
              <div onClick={() => setIsMenuOpen(false)}>
                <NavLinks />
              </div>
            </div>
          </div>
        )}
      </header>
      
      <main className="pt-32">
        {children}
      </main>
    </div>
    </>
  );
}
