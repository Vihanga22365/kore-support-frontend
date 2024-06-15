export interface User {
  email: string;
  name: string;
  password: string;
  city: string;
}

export interface UserResponse {
  statusCode: number;
  message: string;
  ourUsers: any;
}

export interface LogInUser {
  email: string;
  password: string;
}

export interface LogInResponse {
  statusCode: number;
  message: string;
  token?: string;
  refreshToken?: string;
  expirationTime?: string;
  role?: string;
}
