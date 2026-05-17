'use client'
import Link from "next/link";
import { useRouter } from 'next/navigation';
import {
    BookOpenIcon,
    HomeIcon,
    PlusCircleIcon,
    UserCircleIcon,
  } from '@heroicons/react/24/outline';
import { useLogout } from "./hooks/useApi";
const links = [
    {name: 'home', href : '/', icon: HomeIcon},
    {name: 'about', href : '/about', icon:BookOpenIcon},
    {name: 'add', href : '/addImage', icon:PlusCircleIcon},
    {name: 'logout' , href: '#', icon:UserCircleIcon}
]

export default function NavLinks (){
    const router = useRouter();
    const { mutateAsync: logout } = useLogout();

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/login'); 
        } catch (error) {
            console.error("Logout failed", error);
            router.push('/login'); // Redirect anyway
        }
    };
    return (
      <nav className="flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-2">
        {links.map((link) => {
          const Linkicon = link.icon;
          const isLogout = link.name === 'logout';
          
          const content = (
            <>
              <Linkicon
                className={`w-6 h-6 md:w-5 md:h-5 transition-transform duration-300 group-hover:scale-110 ${isLogout ? "text-rose-500" : "text-slate-600 dark:text-slate-400 group-hover:text-theme-primary transition-colors"}`}
                style={!isLogout ? { color: 'var(--primary)' } : {}}
              />
              <span
                className={`font-bold text-lg md:text-sm tracking-wide ${isLogout ? "text-rose-600 dark:text-rose-400" : "text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors"}`}
              >
                {link.name}
              </span>
            </>
          );

          if (isLogout) {
            return (
              <button
                key={link.name}
                onClick={handleLogout}
                className="group flex items-center gap-4 md:gap-2 px-6 md:px-5 py-4 md:py-3 rounded-2xl hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all duration-300 active:scale-95"
              >
                {content}
              </button>
            );
          }

          return (
            <Link 
              href={link.href} 
              key={link.name} 
              className="group flex items-center gap-4 md:gap-2 px-6 md:px-5 py-4 md:py-3 rounded-2xl hover:bg-[rgba(var(--primary-rgb),0.1)] transition-all duration-300 active:scale-95"
            > 
              {content}
            </Link>
          );
        })} 
      </nav>
    );
}

