'use client'
import { useRouter } from 'next/navigation';
import { useUserImages } from '../hooks/useApi';
import { useEffect, useState } from 'react';
import { ImageModal } from '../components/ImageModal';
import { EyeIcon } from '@heroicons/react/24/outline';
import { Loading } from '../components/Loading';

const UserImages = () => {
    const router = useRouter();
    const { data, isLoading, error } = useUserImages();
    const [selectedImage, setSelectedImage] = useState<any>(null);
    useEffect(() => {
        if (error && (error as any).status === 401) {
            router.push('/login');
        }
    }, [error, router]);


    if (isLoading) {
        return <Loading />;
    }

    const images = data?.images || [];


  return (
    <div className="min-h-screen w-full p-6 md:p-12 relative">
      <div className="mesh-background" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative">
        <header className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Your Memory{" "}
            <span className="text-theme-gradient underline decoration-white underline-offset-[10px]">
              Journal
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-xl max-w-2xl leading-relaxed">
            A curated collection of your most cherished moments, preserved
            forever.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {images.length > 0 ? (
            images.map((image: any, index: number) => (
              <div
                key={index}
                onClick={() => setSelectedImage(image)}
                className="glass-card group rounded-3xl overflow-hidden hover:translate-y-[-4px] transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white scale-50 group-hover:scale-100 transition-transform duration-300">
                      <EyeIcon className="w-6 h-6" />
                    </div>
                    <span className="text-white font-bold text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      View Memory
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 truncate group-hover:text-theme-primary transition-colors">
                    {image.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed">
                    {image.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20">
              <div className="glass-card p-12 md:p-20 rounded-[3.5rem] text-center flex flex-col items-center max-w-4xl mx-auto">
                <div
                  className="w-24 h-24 bg-slate-50 dark:bg-slate-800/30 rounded-3xl flex items-center justify-center mb-8 shadow-inner transition-colors"
                  style={{ color: "var(--primary)" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 h-12"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  No memories yet
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-md text-lg">
                  Your journal is empty. Time to start capturing and preserving
                  your beautiful experiences.
                </p>
                <button
                  onClick={() => router.push("/addImage")}
                  className="btn-premium px-12 py-5 text-lg"
                >
                  Create Your First Memory
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ImageModal 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </div>
  );
};

export default UserImages;
