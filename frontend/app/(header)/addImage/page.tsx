"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAnalyzeImage, usePreUploadImage, useSaveImageMetadata } from '../../hooks/useApi'
import { toast } from 'sonner'
import { SparklesIcon } from '@heroicons/react/24/outline'


const AddImage = ()=>{
const [imageUrl, setImageUrl] = useState<string | null>(null)
const [title, setTitle] = useState('')
const [desc, setDesc] = useState('')
const [imagePreview, setImagePreview] = useState <string | null> (null)
const [isGenerating, setIsGenerating] = useState(false)
const [isUploading, setIsUploading] = useState(false)
const router = useRouter();

const { mutateAsync: preUpload } = usePreUploadImage();
const { mutateAsync: saveMetadata, isPending: isSaving } = useSaveImageMetadata();
const { mutateAsync: analyzeImage } = useAnalyzeImage();


const handleGenerateAI = async (silent = false) => {
  if (!imageUrl) {
    if (!silent) toast.error("Please select an image first.");
    return null;
  }

  if (!silent) setIsGenerating(true);
  
  try {
    const analysis = await analyzeImage(imageUrl);
    
    if (!silent) {
      setTitle(analysis.title);
      setDesc(analysis.description);
      toast.success("AI has generated a story for your memory!");
    }
    return analysis;
  } catch (error) {
    if (!silent) toast.error("AI analysis failed. Please try again.");
    return null;
  } finally {
    if (!silent) setIsGenerating(false);
  }
};


const handleChange = async (e:React.ChangeEvent<HTMLInputElement>) =>{
  const file = e.target.files?.[0];
  if (file) {
      // Show local preview immediately
      setImagePreview(URL.createObjectURL(file))
      setIsUploading(true)

      const formData = new FormData();
      formData.append('image', file);

      try {
        const res = await preUpload(formData);
        setImageUrl(res.image_url);
        toast.success("Image ready for your story!");
      } catch (error: any) {
        toast.error(error.message || "Failed to upload image. Please try again.");
        setImagePreview(null);
      } finally {
        setIsUploading(false)
      }
  }
}

const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
e.preventDefault();
if(!imageUrl){
  toast.error("Please upload an image first")
  return;
}

let finalTitle = title.trim();
let finalDesc = desc.trim();

// Smart Upload: If both are empty, use AI automatically
if (!finalTitle && !finalDesc) {
  setIsGenerating(true);
  toast.info("Using AI magic to tell your story...");
  const aiContent = await handleGenerateAI(true);
  if (aiContent) {
    finalTitle = aiContent.title;
    finalDesc = aiContent.description;
    setTitle(finalTitle);
    setDesc(finalDesc);
  }
  setIsGenerating(false);
}

try {
  await saveMetadata({
    title: finalTitle || "Untitled Memory",
    description: finalDesc || "No description provided.",
    image_url: imageUrl
  });
  toast.success("Memory captured successfully!");
  router.push('/');
} catch (error: any) {
  console.error("Error saving image:", error);
  toast.error(error.message || "An error occurred while saving.");
}
};
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative">
      <div className="mesh-background" aria-hidden="true" />
      
      <div className="glass-card w-full max-w-2xl p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden">
        <h1 className="text-4xl font-extrabold text-theme-gradient text-center mb-3 tracking-tight">
          Capture a Memory
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-center mb-12 font-medium text-lg">
          Upload an image and tell its story
        </p>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="A day at the beach..." 
                  className="input-premium w-full dark:bg-slate-800/50" 
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Description</label>
                  <button
                    type="button"
                    onClick={() => handleGenerateAI()}
                    disabled={isGenerating || !imageUrl || isUploading}
                    className="flex items-center gap-1.5 text-xs font-bold text-theme-primary hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed group/ai"
                  >
                    <SparklesIcon className={`w-4 h-4 ${isGenerating ? 'animate-pulse' : 'group-hover/ai:rotate-12 transition-transform'}`} />
                    {isGenerating ? 'Generating...' : 'Generate with AI'}
                  </button>
                </div>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)} 
                  placeholder="Share the details..."
                  rows={5}
                  className="input-premium w-full resize-none dark:bg-slate-800/50"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Image Upload</label>
              <div className="relative group h-full">
                <div 
                  className={`w-full aspect-square rounded-[2rem] border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center overflow-hidden bg-slate-50/50 dark:bg-slate-800/20 
                  ${imagePreview ? 'border-theme-primary shadow-xl' : 'border-slate-300 dark:border-slate-700 group-hover:border-theme-primary group-hover:bg-indigo-50/30 dark:group-hover:bg-indigo-900/20'}`}
                  style={imagePreview ? { boxShadow: '0 20px 40px -10px rgba(var(--primary-rgb), 0.2)' } : {}}
                >
                  
                  {imagePreview ? (
                    <div className="relative w-full h-full group/preview">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className={`object-cover transition-all duration-700 ${isUploading ? 'blur-sm scale-110' : 'group-hover/preview:scale-110'}`}
                      />
                      {isUploading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-all duration-300">
                          <span className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin mb-3" />
                          <p className="text-white font-bold text-xs tracking-widest uppercase">Uploading to Cloud...</p>
                        </div>
                      )}
                      {!isUploading && (
                        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm opacity-0 group-hover/preview:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                          </div>
                          <p className="text-white font-bold text-sm tracking-wide">Change Photo</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center p-8">
                      <div 
                        className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-black/5"
                        style={{ color: 'var(--primary)' }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 font-bold mb-2 text-lg">Upload Photo</p>
                      <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">JPG, PNG or WEBP (Max 5MB)</p>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-6 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-5 font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving || isGenerating || isUploading}
              className="flex-[2] btn-premium flex items-center justify-center gap-3 py-5 text-lg relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              {isSaving || isGenerating ? (
                <>
                  <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {isGenerating ? "AI is thinking..." : "Saving Memory..."}
                </>
              ) : (
                <>
                  {(!title && !desc) ? (
                    <>
                      <SparklesIcon className="w-6 h-6 animate-pulse" />
                      Magic Upload
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                      </svg>
                      Publish Memory
                    </>
                  )}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddImage;