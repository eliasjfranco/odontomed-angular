import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("token");

    if(!token){
      console.log(token);
      return next.handle(req);
      
    }

    const reqq = req.clone({
      headers: req.headers.set('Authorization', `${token}`),
    });
    console.log(token);
    return next.handle(reqq);
  }
}
