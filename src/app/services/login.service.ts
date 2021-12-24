import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from '../model/login';
import { ModificarUsuario } from '../model/modificar-usuario';
import { JwtHelperService } from '@auth0/angular-jwt'
import { Jwt } from '../model/jwt';

const helper = new JwtHelperService();


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private logged = new BehaviorSubject<boolean>(false);
  private url: string = "http://localhost:8082/auth";

  constructor(private http:HttpClient) { 
    this.checkToken();
  }

  //Obtener login
  get():Observable<Login>{
    return this.http.get<Login>(this.url);
  }

  login(login:Login):Observable<Jwt | void>{
    let endpoint = this.url + "/login"
    return this.http.post<Jwt>(endpoint, login).pipe(
      map((res: Jwt) => localStorage.setItem("token","" + res.token))
    );
  }

  modificarPwd(usuario: ModificarUsuario): Observable<any>{
    let endpoint = this.url + "/modificarPassword"
    return this.http.post<any>(endpoint, usuario);
  }

  isLogged():boolean{
    return this.checkToken();
  }

  private checkToken():boolean{
    const userToken = new Jwt(localStorage.getItem("token"));
    if(userToken.token == null || userToken.token === ''){
      return false;
    }
    const isExpired = helper.isTokenExpired(userToken.token);
    if(isExpired == false){
      return true;
    }
  }

  logout():void{
    window.localStorage.clear();
  }

}
