import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { LoginService } from "../login.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
    constructor(private service: LoginService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{

        if(this.service.isLogged()){
            return true;
        }
        this.router.navigate(['/login']);
        return false;


    }
}
