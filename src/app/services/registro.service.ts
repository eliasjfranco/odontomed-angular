import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../model/response/register';
import { RegisterResponse } from '../model/response/registerResponse';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private url: string = "http://localhost:8082/auth/register";

  constructor(private http: HttpClient) { }

  register(reg : RegisterRequest):Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>(this.url, reg)
  }
}
