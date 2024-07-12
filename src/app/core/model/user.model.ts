export interface User {
  email: string;
  name: string;
  password: string;
  city: string;
  roles: string[];
}

export interface UserResponse {
  statusCode: number;
  message: string;
  ourUsers: any;
}

export interface SingleUserResponse {
  statusCode: number;
  message: string;
  ourUsers: SingleUserDetailsResponse;
}

export interface SingleUserDetailsResponse {
  id: number;
  email: string;
  name: string;
  password: string;
  city: string;
  roles: string[];
  productGroup: null;
  enabled: boolean;
  username: string;
  authorities: any;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
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
  roles?: string[];
  productGroup?: string[];
  email?: string;
}

export interface FetchUsersMainResponse {
  statusCode: number;
  message: string;
  ourUsersList: FetchUsersSubResponse[];
}

export interface FetchUsersSubResponse {
  id: number;
  email: string;
  name: string;
  password: string;
  city: string;
  roles: string[];
  productGroup: string[];
  enabled: boolean;
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  username: string;
  authorities: Authority[];
}

export interface Authority {
  authority: string;
}

export interface UserRoleDetails {
  roles: string[];
}

export interface UserProductGroupDetails {
  productGroup: string[];
}
