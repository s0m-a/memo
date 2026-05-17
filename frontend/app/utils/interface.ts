export interface LoginResponse {
  message?: string;
  userId: string;
}

export interface UploadImageData {
  UserId?: number;
  image_url: (url: string) => string;
  title: string;
  description: string;
}

export interface UploadImageResponse {
  status: string;
  message: string;
  data?: any;
}

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
}

export interface RegisterUserResponse {
  status: "success" | "error";
  message: string;
  id?: string;
}