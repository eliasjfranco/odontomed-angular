import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class ErrorNotificacion {

  constructor(public snackBar: MatSnackBar, private zone: NgZone) { }

  showError(code: number, message: string, clas: string): void{
    this.zone.run(() => {
    this.snackBar.open(message, 'X', {panelClass: [clas], horizontalPosition: 'center', verticalPosition: 'top', duration: 3000});
    });
  }
}
