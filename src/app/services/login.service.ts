import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from '../model/login';
import { ModificarUsuario } from '../model/modificar-usuario';
import { JwtHelperService } from '@auth0/angular-jwt'
import { Jwt } from '../model/jwt';
import { RegisterResponse } from '../model/response/registerResponse';

const helper = new JwtHelperService();


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  //conexion mediante local
  private url: string = "http://localhost:8082/auth";

  //conexion mediante docker
  //private url: string = "http://odontomed-app:8082/auth";

  constructor(private http:HttpClient) { 
    this.checkToken();
  }

  //Obtener login
  get():Observable<Login>{
    return this.http.get<Login>(this.url);
  }

  getInfo():String{
    let obj = helper.decodeToken(localStorage.getItem("token"));
    let nameJson = JSON.stringify(obj,['name']);
    let nombre = JSON.parse(nameJson);
    return nombre['name'];
  }

  getEmail():string{
    let obj = helper.decodeToken(localStorage.getItem("token"));
    let correoJson = JSON.stringify(obj,['sub']);
    let correo = JSON.parse(correoJson);
    return correo['sub'];
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

  getDatos():Observable<RegisterResponse>{
    let endpoint = this.url + "/info"
    let email = new Login(this.getEmail(), null)
    return this.http.post<RegisterResponse>(endpoint, email);
    
  }

  isLogged():boolean{
    let log = this.checkToken();
    if(log == false){
      localStorage.clear();
      return log;
    }
    return log;
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
