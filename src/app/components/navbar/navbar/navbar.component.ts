import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MatMenu } from '@angular/material/menu';
import { $ } from 'protractor';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //sirve para obtener tamaño de pantalla
  /*@ViewChild('main')
  main: ElementRef;*/
  isLogged = false;
  name: String;
  mobile:boolean=false

  constructor(private service: LoginService, private route: Router) { }

  /*ngAfterViewInit(){
    let width = (this.main.nativeElement.offsetWidth);
    if(width < 500){
      this.mobile = true;
    }else{
      this.mobile = false;
    }
  }*/

  ngOnInit(): void {
    this.isLogged = this.service.isLogged()
    if(this.isLogged){
      this.name = this.service.getInfo();
    }

  }

  logout():void{
    this.service.logout();
    this.route.navigate(['/login']);
  }

  


}
