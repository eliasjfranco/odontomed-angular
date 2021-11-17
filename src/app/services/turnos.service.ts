import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Turno } from '../model/turno';
import { Turno_Persona } from '../model/turno_persona';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  private url: string = "http://localhost:8082/turno"

  constructor(private http:HttpClient) { }

  getAll():Observable<Turno_Persona[]>{
    return this.http.get<Turno_Persona[]>(this.url);
  }

  getIdTurnos():Observable<Turno[]>{
    this.url = this.url + "/getId";
    return this.http.get<Turno[]>(this.url);
  }
}
