'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useForgotPassword } from '../hooks/useApi';
import { AuthLayoutWrapper } from '../components/AuthLayoutWrapper';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const { mutateAsync: forgotPassword, isPending } = useForgotPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      toast.success('Reset link sent to your email!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to send reset link');
    }
  };

  return (
    <AuthLayoutWrapper
      title="Reset Password"
      subtitle="Enter your email to receive a password recovery link"
      isPending={isPending}
      footer={
        <Link
          href="/login"
          className="font-bold hover:underline transition-all text-[var(--primary)] hover:text-[var(--primary-hover)]"
        >
          Back to Login
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-8 select-none">
        
        {/* Email Input Field */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1">
            Email Address
          </label>
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 focus-within:border-[var(--primary)] text-slate-400 focus-within:text-[var(--primary)] transition-all duration-300 py-3">
            {/* Mail SVG Icon */}
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-800" />
            <input
              type="email"
              placeholder="hello@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent focus:outline-none w-full text-slate-800 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 text-base py-0.5"
            />
          </div>
        </div>

        {/* Send Reset Link Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] active:scale-[0.98] py-4.5 text-white font-extrabold rounded-2xl transition-all shadow-lg hover:shadow-[var(--primary)]/30 disabled:opacity-50 disabled:pointer-events-none mt-4 text-base tracking-wide flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending link...
            </>
          ) : (
            'Send Reset Link'
          )}
        </button>
      </form>
    </AuthLayoutWrapper>
  );
};

export default ForgotPasswordPage;
