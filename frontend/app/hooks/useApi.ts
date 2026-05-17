"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { loginUser, preUploadImage, saveImageMetadata, analyzeImage, registerUser, retrieveImages, logoutUser, updateImage, deleteImage, forgotPassword, resetPassword } from "../utils/api";
import {
  UploadImageData,
  RegisterUser as RegisterUserInterface,
  LoginResponse,
  UploadImageResponse,
  RegisterUserResponse,
} from "../utils/interface";

interface LoginVariables {
  username: string;
  password: string;
}

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginVariables>({
    mutationFn: ({ username, password }) => loginUser(username, password),
  });
};

export const usePreUploadImage = () => {
  return useMutation<{ status: string; image_url: string }, Error, FormData>({
    mutationFn: preUploadImage,
  });
};

export const useSaveImageMetadata = () => {
  return useMutation<UploadImageResponse, Error, { title: string; description: string; image_url: string }>({
    mutationFn: saveImageMetadata,
  });
};

export const useAnalyzeImage = () => {
  return useMutation<{ title: string; description: string }, Error, string>({
    mutationFn: analyzeImage,
  });
};

export const useRegisterUser = () => {
  return useMutation<RegisterUserResponse, Error, RegisterUserInterface>({
    mutationFn: (userdata) => registerUser(userdata),
  });
};

export const useUserImages = () => {
    return useQuery({
        queryKey: ['userImages'],
        queryFn: retrieveImages,
        retry: false,
    });
};

export const useLogout = () => {
    return useMutation({
        mutationFn: logoutUser,
    });
};

export const useUpdateImage = () => {
  return useMutation<any, Error, { id: string; title: string; description: string }>({
    mutationFn: ({ id, title, description }) => updateImage(id, { title, description }),
  });
};

export const useDeleteImage = () => {
  return useMutation<any, Error, string>({
    mutationFn: deleteImage,
  });
};

export const useForgotPassword = () => {
  return useMutation<any, Error, string>({
    mutationFn: forgotPassword,
  });
};

export const useResetPassword = () => {
  return useMutation<any, Error, { token: string; password: any }>({
    mutationFn: resetPassword,
  });
};