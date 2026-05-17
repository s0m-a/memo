'use client'
import React, { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import { AiTwotoneEdit } from "react-icons/ai";
import { PiTrash } from "react-icons/pi";
import { IoIosCheckmark } from "react-icons/io";
import { HiMiniNoSymbol } from "react-icons/hi2";
import { useUpdateImage, useDeleteImage } from '../hooks/useApi';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface ImageModalProps {
  image: {
    _id: string;
    image_url: string;
    title: string;
    description: string;
  } | null;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const queryClient = useQueryClient();
  const updateMutation = useUpdateImage();
  const deleteMutation = useDeleteImage();

  useEffect(() => {
    if (image) {
      setEditedTitle(image.title);
      setEditedDescription(image.description);
      setIsEditing(false);
      setIsDeleting(false);
    }
  }, [image]);

  if (!image) return null;

  const handleUpdate = async () => {
    try {
      await updateMutation.mutateAsync({
        id: image._id,
        title: editedTitle,
        description: editedDescription,
      });
      queryClient.invalidateQueries({ queryKey: ['userImages'] });
      setIsEditing(false);
      toast.success('Memory updated successfully');
    } catch (error) {
      toast.error('Failed to update memory');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(image._id);
      queryClient.invalidateQueries({ queryKey: ['userImages'] });
      onClose();
      toast.success('Memory deleted successfully');
    } catch (error) {
      toast.error('Failed to delete memory');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
      <div
        className="fixed inset-0  bg-slate-900/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative w-full max-w-5xl max-h-[90vh] flex flex-col items-center animate-in zoom-in-95 fade-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-2 md:-right-0 z-10 p-2 mr-2 md:mr-6 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xl hover:scale-110 active:scale-95 transition-all"
        >
          <IoClose className="w-6 h-6" />
        </button>

        <div className="w-full h-full flex flex-col overflow-hidden rounded-[2.5rem] shadow-2xl border border-white/20 bg-slate-50 dark:bg-slate-900">
          <div className="flex-1 bg-black/5 flex items-center justify-center overflow-hidden relative group">
            <img
              src={image.image_url}
              alt={image.title}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="glass-card w-full p-8 md:p-10 rounded-t-none border-t-0">
            {!isEditing && !isDeleting && (
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <h2 className="text-3xl md:text-4xl font-extrabold text-theme-gradient tracking-tight">
                  {image.title}
                </h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-theme-primary hover:bg-theme-primary/10 transition-all shadow-sm"
                    title="Edit Memory"
                  >
                    <AiTwotoneEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsDeleting(true)}
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all shadow-sm"
                    title="Delete Memory"
                  >
                    <PiTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {isEditing ? (
              <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-800/50 border-2 border-transparent focus:border-theme-primary/50 rounded-2xl px-6 py-3 text-xl font-bold text-slate-800 dark:text-white outline-none transition-all"
                    placeholder="Memory Title"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 ml-1">
                    Description
                  </label>
                  <textarea
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-800/50 border-2 border-transparent focus:border-theme-primary/50 rounded-2xl px-6 py-4 text-lg text-slate-600 dark:text-slate-300 outline-none transition-all min-h-[120px] resize-none"
                    placeholder="Tell the story behind this memory..."
                  />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
                  >
                    <HiMiniNoSymbol className="w-5 h-5" />
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    disabled={updateMutation.isPending}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white bg-theme-primary hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-50"
                  >
                    {updateMutation.isPending ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <IoIosCheckmark className="w-5 h-5" />
                    )}
                    Save Changes
                  </button>
                </div>
              </div>
            ) : isDeleting ? (
              <div className="text-center py-4 animate-in zoom-in-95 duration-300">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Delete this memory?
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-8">
                  This action cannot be undone. Are you sure you want to remove
                  this moment from your journal?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setIsDeleting(false)}
                    className="px-8 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
                  >
                    Keep it
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleteMutation.isPending}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 hover:scale-105 active:scale-95 transition-all shadow-lg disabled:opacity-50"
                  >
                    {deleteMutation.isPending ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <PiTrash className="w-5 h-5" />
                    )}
                    Yes, Delete
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-4xl">
                {image.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
