import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistroService } from 'src/app/services/registro.service';
import { RegisterRequest } from 'src/app/model/response/register';
import { ErrorNotificacion } from 'src/app/services/error-notificacion';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  register: RegisterRequest;
  dia: string;
  mes: string;
  ano: string;
  firstname: string;
  lastname: string;
  email: string;
  dni: string;
  password: string;
  tel: string;
  regForm: FormGroup;

  constructor(
    private datePipe: DatePipe,
    private builder: FormBuilder,
    private service: RegistroService,
    private alerta: ErrorNotificacion
  ) { }

  ngOnInit(): void {
    this.regForm = this.builder.group({
      dia: [null, Validators.required],
      mes: [null, Validators.required],
      ano: [null, Validators.required],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, Validators.required],
      dni: [null, Validators.required],
      password: [null, Validators.required],
      tel: [null, Validators.required],
    });
  }


  onRegister():void{
    let fecha = this.dia + "/" + this.mes + "/" + this.ano ;
    this.register = new RegisterRequest(this.email, this.firstname, this.lastname, fecha, this.dni, this.password, this.tel);
    this.service.register(this.register).subscribe(
      t => {
        console.log(t);
        this.alerta.showError(201, "Registrado con exito!", 'okReg');
      }
    );

  }

}
