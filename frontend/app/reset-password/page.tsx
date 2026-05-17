'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { useResetPassword } from '../hooks/useApi';
import { AuthLayoutWrapper } from '../components/AuthLayoutWrapper';

const ResetPasswordContent = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const { mutateAsync: resetPassword, isPending } = useResetPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }
    if (!token) {
      return toast.error('Reset token is missing');
    }
    try {
      await resetPassword({ token, password });
      toast.success('Password reset successfully. You can now login.');
      router.push('/login');
    } catch (err: any) {
      toast.error(err.message || 'Failed to reset password');
    }
  };

  return (
    <AuthLayoutWrapper
      title="New Password"
      subtitle="Create a secure, new password for your account"
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
        
        {/* New Password Input Field */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1">
            New Password
          </label>
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 focus-within:border-[var(--primary)] text-slate-400 focus-within:text-[var(--primary)] transition-all duration-300 py-3 relative">
            {/* Lock SVG Icon */}
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-800" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
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

        {/* Confirm Password Input Field */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1">
            Confirm Password
          </label>
          <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 focus-within:border-[var(--primary)] text-slate-400 focus-within:text-[var(--primary)] transition-all duration-300 py-3 relative">
            {/* Lock SVG Icon */}
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <div className="w-[1px] h-4 bg-slate-200 dark:bg-slate-800" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="bg-transparent focus:outline-none w-full text-slate-800 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 text-base py-0.5 pr-10"
            />
            {/* Eye toggle button */}
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              {showConfirmPassword ? (
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

        {/* Reset Password Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] active:scale-[0.98] py-4.5 text-white font-extrabold rounded-2xl transition-all shadow-lg hover:shadow-[var(--primary)]/30 disabled:opacity-50 disabled:pointer-events-none mt-4 text-base tracking-wide flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Resetting password...
            </>
          ) : (
            'Reset Password'
          )}
        </button>
      </form>
    </AuthLayoutWrapper>
  );
};

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-[var(--primary)] rounded-full animate-spin" />
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPasswordPage;
