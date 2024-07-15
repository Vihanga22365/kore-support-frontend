import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmailGroups, EmailGroupsResponse } from '../model/email-groups.model';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class EmailGroupsService {
  constructor(private _httpClient: HttpClient) {}

  createEmailGroup = (emailGroup: EmailGroups) => {
    return this._httpClient.post<EmailGroupsResponse>(`${environment.EMAIL_GROUPS_URL}`, emailGroup);
  };

  getEmailGroups = () => {
    return this._httpClient.get<EmailGroupsResponse[]>(`${environment.EMAIL_GROUPS_URL}`);
  };

  deleteEmailGroup = (emailId: number) => {
    return this._httpClient.delete(`${environment.EMAIL_GROUPS_URL}/${emailId}`);
  };
}
