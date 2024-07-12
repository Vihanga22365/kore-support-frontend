import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FetchUsersMainResponse, LogInResponse, LogInUser, SingleUserResponse, User, UserProductGroupDetails, UserResponse, UserRoleDetails } from '../model/user.model';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class UserManageService {
  constructor(private _httpClient: HttpClient) {}

  createUser = (userDetails: User) => {
    return this._httpClient.post<UserResponse>(`${environment.AUTH_URL}/register`, userDetails);
  };

  logInUser = (userDetails: LogInUser) => {
    return this._httpClient.post<LogInResponse>(`${environment.AUTH_URL}/login`, userDetails);
  };

  getAllUsers = () => {
    return this._httpClient.get<FetchUsersMainResponse>(`${environment.AUTH_ADMIN_URL}/get-all-users`);
  };

  updateUserRole = (userId: number, userRoleDetails: UserRoleDetails) => {
    return this._httpClient.put<UserResponse>(`${environment.AUTH_ADMIN_URL}/set-role/${userId}`, userRoleDetails);
  };

  updateUserProductGroup = (userId: number, productGroup: UserProductGroupDetails) => {
    return this._httpClient.put<UserResponse>(`${environment.AUTH_ADMIN_URL}/set-product-group/${userId}`, productGroup);
  };

  getUserDetails = () => {
    return this._httpClient.get<SingleUserResponse>(`${environment.MAIN_URL}/adminuser/get-profile`);
  };
}
