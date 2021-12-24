import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { ErrorNotificacion } from './error-notificacion';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(public alerta:ErrorNotificacion, private route: Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");
    if(!token){
      return next.handle(req);
      
    }

    const reqq = req.clone({
      headers: req.headers.set('Authorization', `${token}`),
    });
    return next.handle(reqq)
            .pipe(
              catchError((error: HttpErrorResponse) => {
                switch(error.status){
                /*//alerta login
                case 200:
                  this.alerta.showError(error.status, error.error);*/
                //alerta registro ok
                case 201:
                  this.alerta.showError(error.status, error.error, 'okReg');
                //alerta guardado turno ok
                case 202:
                  this.alerta.showError(error.status, error.error, 'okTurn');
                //alerta modificado datos usuario ok
                case 206:
                  this.alerta.showError(error.status, error.error, 'okModif')
                //alerta registro error
                case 400:
                  this.alerta.showError(error.status, error.error, 'error');
                  //= `Error code: ${error.status}, Mensaje: ${error.error}`;
                //alerta no autorizado modificar datos usuario
                case 401:
                  this.alerta.showError(401, "Credenciales vencidas", 'errorMod');
                //alerta error login
                case 403:
                  this.alerta.showError(error.status, error.error, 'errorLog');
                //alertar error no encontrado
                case 404:
                  this.alerta.showError(error.status, error.error, 'error');
                //errores JWT
                case 415:
                  this.route.navigate[('/login')];
                }
                return throwError(error);
              })
            )
  }


  
}
