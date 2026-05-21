// pages/login.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { useLogin } from '../hooks/useApi';
import { AuthLayoutWrapper } from '../components/AuthLayoutWrapper';
import { useQueryClient } from '@tanstack/react-query';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync: loginUser, isPending } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginUser({ username, password });
      toast.success("Welcome back!");
      queryClient.clear();
      router.push('/');
    } catch (err: any) {
      toast.error(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <AuthLayoutWrapper
      title="Sign in"
      subtitle="Enter your details to access your memories"
      isPending={isPending}
      footer={
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Don't have an Account ?{' '}
          <Link
            href="/register"
            className="font-bold hover:underline transition-all text-[var(--primary)] hover:text-[var(--primary-hover)]"
          >
            Sign up
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-8 select-none">
        
        {/* Username Input Field */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1">
            Username
          </label>
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 focus-within:border-[var(--primary)] text-slate-400 focus-within:text-[var(--primary)] transition-all duration-300 py-3">
            {/* User SVG Icon */}
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {/* Minimal vertical separator */}
            <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-800" />
            <input
              type="text"
              placeholder="enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-transparent focus:outline-none w-full text-slate-800 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 text-base py-0.5"
            />
          </div>
        </div>

        {/* Password Input Field */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1">
            Password
          </label>
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 focus-within:border-[var(--primary)] text-slate-400 focus-within:text-[var(--primary)] transition-all duration-300 py-3 relative">
            {/* Lock SVG Icon */}
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            {/* Minimal vertical separator */}
            <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-800" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-transparent focus:outline-none w-full text-slate-800 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 text-base py-0.5 pr-10"
            />
            {/* Eye toggle button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L5.636 5.636m8.485 8.485L18.364 18.364M3.05 3.05l17.9 17.9" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Remember me & Forgot Password Row */}
        <div className="flex justify-between items-center text-xs">
          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-500 dark:text-slate-400">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <div className="w-4.5 h-4.5 rounded border border-slate-200 dark:border-slate-800 flex items-center justify-center peer-checked:border-[var(--primary)] peer-checked:bg-[var(--primary)] transition-all bg-white dark:bg-slate-900">
              <svg className="w-3 h-3 text-white fill-none stroke-current stroke-[3]" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="font-bold">Remember Me</span>
          </label>

          <Link
            href="/forgot-password"
            className="font-bold text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] active:scale-[0.98] py-4.5 p-2 text-white font-extrabold rounded-2xl transition-all shadow-lg hover:shadow-[var(--primary)]/30 disabled:opacity-50 disabled:pointer-events-none mt-4 text-base tracking-wide flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </button>
      </form>
    </AuthLayoutWrapper>
  );
};

export default LoginPage;