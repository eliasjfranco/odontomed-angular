import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class ErrorNotificacion {

  constructor(public snackBar: MatSnackBar, private zone: NgZone) { }

  showError(code: number, message: string, clas: string): void{
    /*switch(code){
      case 201:
        clas = 'guardado';
      case 202: 
        clas = 'guardado';
      case 206:
        clas = 'modificado';
      case 400:
        clas = 'error';
      case 401:
        clas = 'errorLogin';
      
    }*/
    this.zone.run(() => {

    
    this.snackBar.open(message, 'X', {panelClass: [clas], horizontalPosition: 'center', verticalPosition: 'top'});
    });
  }
}
