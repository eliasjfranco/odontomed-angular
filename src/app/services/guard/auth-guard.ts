import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { ErrorNotificacion } from "../error-notificacion";
import { LoginService } from "../login.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

    constructor(private service: LoginService, private router: Router, private alerta:ErrorNotificacion){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{

        if(this.service.isLogged()){
            return true;
        }
        this.alerta.showError(401, "No está logeado", 'error');
       // setTimeout(() =>  this.router.navigate(['/login']), 1000);
        this.router.navigate(['/login']);
        return false;


    }
}
