import { LoginResponse, UploadImageData, UploadImageResponse, RegisterUser, RegisterUserResponse } from "./interface";
import API from "../lib/axios"

export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await API.post<LoginResponse>(
          `auth/login`,
          { username, password }
        );
        return response.data;
    } catch (error: any) {
        console.error('login failed', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || error.message || 'failed to log in');
    }
};

export const preUploadImage = async (data: FormData): Promise<{ status: string; image_url: string }> => {
    try {
        const response = await API.post(
          `image/pre-upload`,
          data
        );
        return response.data;
    } catch (error: any) {
        console.error('image pre-upload failed', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || error.message || 'failed to pre-upload image');
    }
};

export const saveImageMetadata = async (data: { title: string; description: string; image_url: string }): Promise<UploadImageResponse> => {
    try {
        const response = await API.post<UploadImageResponse>(
          `image/save`,
          data
        );
        return response.data;
    } catch (error: any) {
        console.error('image save failed', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || error.message || 'failed to save image');
    }
};

export const analyzeImage = async (image_url: string): Promise<{ title: string; description: string }> => {
    try {
        const response = await API.post(
          `image/analyze`,
          { image_url }
        );
        return response.data;
    } catch (error: any) {
        console.error('image analysis failed', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || error.message || 'failed to analyze image');
    }
};

export const registerUser = async (
  userdata: RegisterUser
): Promise<RegisterUserResponse> => {
  try {
    const response = await API.post<RegisterUserResponse>(
      `auth/register`,
      userdata
    );
    return response.data;
  } catch (error: any) {
    console.error("registering user failed", error.response?.data || error.message);
    throw new Error(error?.message || error.message || "failed to register user");
  }
};

export const retrieveImages = async (): Promise<{ images: any[] }> => {
  try {
    const response = await API.get(`image/retrieve`);
    return response.data;
  } catch (error: any) {
    console.error("fetching images failed", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || error.message || "failed to fetch images");
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await API.post(`auth/logout`);
  } catch (error: any) {
    console.error("logout failed", error.response?.data || error.message);
  }
};

export const updateImage = async (id: string, data: { title: string; description: string }): Promise<any> => {
  try {
    const response = await API.put(`image/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error("updating image failed", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || error.message || "failed to update image");
  }
};

export const deleteImage = async (id: string): Promise<any> => {
  try {
    const response = await API.delete(`image/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("deleting image failed", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || error.message || "failed to delete image");
  }
};

export const forgotPassword = async (email: string): Promise<any> => {
  try {
    const response = await API.post(`auth/forgot-password`, { email });
    return response.data;
  } catch (error: any) {
    console.error("forgot password failed", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || error.message || "failed to request password reset");
  }
};

export const resetPassword = async (data: { token: string; password: any }): Promise<any> => {
  try {
    const response = await API.post(`auth/reset-password`, data);
    return response.data;
  } catch (error: any) {
    console.error("reset password failed", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || error.message || "failed to reset password");
  }
};
