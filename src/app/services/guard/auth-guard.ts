import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "../login.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
    constructor(private service: LoginService){}


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        this.service.isLogged(window.localStorage.getItem("token")).subscribe(p => {
            var x = console.log(p.ok)
            console.log(x)
        })
        /* if(!this.service.isLogged(localStorage.getItem("token"))){
            console.log("no esta logeado!");
            this.router.navigate(['/login'])
            return false;
        }
        return true; */
        return true
    }
}
