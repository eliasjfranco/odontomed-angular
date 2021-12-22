import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Login } from '../../model/login';
import { MatDialog } from '@angular/material/dialog'
import { PasswordComponent } from 'src/app/components/password/password.component';
import { ModificarUsuario } from 'src/app/model/modificar-usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  login : boolean;
  pwd : boolean = false;
  registro : boolean = false;
  emailPwd: string;
  dniPwd: string;
  passwordPwd: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.login = true;
  }

  onLogin(): void{
    let loginUser = new Login(this.email, this.password);
    this.loginService.login(loginUser).subscribe(
      data => {
        localStorage.setItem("token", data.token);
        this.redirect();
      }
    )

  }

  redirect(): void{
    this.router.navigate(['/turnos']);
  }

  recuperarPwd():void{
    let modificarUser = new ModificarUsuario(this.emailPwd, this.dniPwd, this.passwordPwd);
    this.dialog.open(PasswordComponent);
    this.loginService.modificarPwd(modificarUser).subscribe(p => {
      setTimeout(() => { this.backLogin(), 3000});
    })
    
    
    /*this.dialog.open(PasswordComponent);
    this.login = true;
    this.pwd = false;*/
  }

  goRecuperar():void{
    this.pwd = true;
    this.login = false;
  }

  backLogin():void{
    this.pwd = false;
    this.login = true;
  }

}
