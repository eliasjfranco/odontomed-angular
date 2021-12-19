import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Login } from '../../model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser: Login;
  email: string;
  password: string;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogin(): void{
    this.loginUser = new Login(this.email, this.password);
    this.loginService.login(this.loginUser).subscribe(
      data => {
        localStorage.setItem("token", data.token);
        this.redirect();
      }
    )

  }

  redirect(): void{
    this.router.navigate(['/turnos']);
  }

}
