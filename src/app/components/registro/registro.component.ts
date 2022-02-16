import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RegistroService } from 'src/app/services/registro.service';
import { RegisterRequest } from 'src/app/model/response/register';
import { ErrorNotificacion } from 'src/app/services/error-notificacion';
import { Router } from '@angular/router';
import { MatFormFieldControl } from '@angular/material/form-field';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  fecha: Date;
  register: RegisterRequest;
  firstname: string;
  lastname: string;
  email: string;
  dni: string;
  password: string;
  tel: string;
  events: string[] = [];
  image : string;

  constructor(
    private datePipe: DatePipe,
    private service: RegistroService,
    private alerta: ErrorNotificacion,
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  onRegister():void{
    let nacimiento = this.datePipe.transform(this.fecha, 'dd/MM/yyyy');
    console.log(nacimiento);
    this.register = new RegisterRequest(this.email, this.firstname, this.lastname, nacimiento, this.dni, this.password, this.tel);
    this.service.register(this.register).subscribe(
      t => {
        console.log(t);
        this.alerta.showError(201, "Registrado con exito!", 'okReg');
        setTimeout(() => this.router.navigate(['/login']), 5000);
      }
    );

  }

  /*fileEvent(fileInput: Event) {
    let file = (<HTMLInputElement>fileInput.target).files[0];
    if(file.type == "image/png" || file.type == "image/jpeg"){
      this.image = file.name;
    }
  }*/

}
