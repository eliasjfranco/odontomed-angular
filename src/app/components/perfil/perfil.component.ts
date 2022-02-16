import { Component, OnInit } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { RegisterResponse } from 'src/app/model/response/registerResponse'
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  ipersonal: boolean;
  contacto: boolean;
  turnos: boolean;
  selected: string;
  nombre: string;
  apellido: string;
  DNI: string;
  tel: string;
  correo: string;
  fnac: string;
  modificar:boolean=false;

  constructor(private service:LoginService) { }

  ngOnInit(): void {
    this.ipersonal = false;
    this.contacto = false;
    this.turnos = false;
    this.obtenerDatos();
  }

  goInfo(){
    this.selected = "Información Personal";
    this.ipersonal = true;
    this.contacto = false;
    this.turnos = false;
  }

  goContacto(){
    this.selected = "Información de Contacto";
    this.ipersonal = false;
    this.contacto = true;
    this.turnos = false;
    this.correo = this.service.getEmail();
  }

  goTurnos(){
    this.selected = "Mis Turnos";
    this.ipersonal = false;
    this.contacto = false;
    this.turnos = true;
  }

  obtenerDatos():void{
    let p = new RegisterResponse();
    this.service.getDatos().subscribe(res => {
      p = plainToClass(RegisterResponse, res)
      this.nombre = this.parseJson(p, 'firstname');
      this.apellido = this.parseJson(p,'lastname');
      this.DNI = this.parseJson(p,'dni');
      this.fnac = this.parseJson(p,'fecha');
      this.tel = this.parseJson(p,'tel')
    })
  }

  parseJson(json: RegisterResponse, param:string){
    let x = JSON.stringify(json,[param]);
    x = JSON.parse(x);
    x = x[param];
    return x;
  }

}
