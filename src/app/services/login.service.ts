import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = "http://localhost:8082/auth/login";

  constructor(private http:HttpClient) { }

  //Obtener login
  get():Observable<Login>{
    return this.http.get<Login>(this.url);
  }

  login(login:Login):Observable<any>{
    return this.http.post<any>(this.url, login);
  }

}
