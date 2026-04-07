import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success?: boolean;
  message?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private http = inject(HttpClient);

  sendMessage(data: ContactFormData): Observable<ContactResponse> {
    return this.http.post<ContactResponse>('/api/contact', data);
  }
}
