import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlockTurn } from '../model/response/block-turn';
import { Turno } from '../model/turno';
import { Turno_Persona } from '../model/turno_persona';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  private url: string = "http://localhost:8082/turno";
  private endpoint: string;
  constructor(private http:HttpClient) { }

  getAll():Observable<Turno_Persona[]>{
    return this.http.get<Turno_Persona[]>(this.url);
  }

  getIdTurnos():Observable<Turno[]>{
    this.endpoint = this.url + "/getId";
    return this.http.get<Turno[]>(this.endpoint);
  }

  saveTurno(turno: Turno_Persona):Observable<Turno_Persona>{
    return this.http.post<Turno_Persona>(this.url, turno);
  }

   getCantId():Observable<BlockTurn>{
    this.endpoint = this.url + "/blockTurn";
    return this.http.get<BlockTurn>(this.endpoint);
  }
}
