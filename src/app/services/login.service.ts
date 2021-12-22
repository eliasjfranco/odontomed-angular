import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../model/login';
import { ModificarUsuario } from '../model/modificar-usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = "http://localhost:8082/auth";

  constructor(private http:HttpClient) { }

  //Obtener login
  get():Observable<Login>{
    return this.http.get<Login>(this.url);
  }

  login(login:Login):Observable<any>{
    let endpoint = this.url + "/login"
    return this.http.post<any>(endpoint, login);
  }

  modificarPwd(usuario: ModificarUsuario): Observable<any>{
    let endpoint = this.url + "/modificarPassword"
    return this.http.post<any>(endpoint, usuario);
  }

}
