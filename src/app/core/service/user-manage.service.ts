import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogInResponse, LogInUser, User, UserResponse } from '../model/user.model';
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
}
