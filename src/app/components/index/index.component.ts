import { AfterContentInit, ChangeDetectorRef, Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, AfterContentInit, DoCheck {

  flag: boolean;

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngAfterContentInit() {
    if (!this.flag) {
      document.getElementById("body").classList.add("cortina");
      document.getElementsByTagName("app-footer").item(0).classList.add("invisible");
      document.getElementsByTagName("app-navbar").item(0).classList.add("invisible");
      document.getElementsByTagName("app-carousel").item(0).classList.add("invisible");
      //document.getElementById("principal").classList.add("imagenes");
      setTimeout(() => this.mostrarEstrellas(), 2000);
    }
  }

  ngDoCheck(){
    this.flag = false
    let session = Number(localStorage.getItem("session"));
    let time = new Date().getTime();
    
    if (session == null || session < time) {
      console.log("time es mayor: " + time);
      let control = new Date(time).getTime() + (2 * 60 * 1000);
      localStorage.setItem("session", control.toString());
      this.flag = true
    }
  }

  ngOnInit(): void {
    this.cd.detectChanges();
  }

  mostrarEstrellas(): void {
    document.getElementById("star").classList.remove("ocultar");
    document.getElementById("star").classList.add("star");
    setTimeout(() => this.deleteImg(), 5500);
  }

  deleteImg(): void {
    document.getElementById("star").classList.remove("star");
    document.getElementById("star").classList.add("ocultar");
    document.getElementById("cepillo").classList.add("ocultar");
    document.getElementById("diente").classList.add("ocultar");
    document.getElementById("body").classList.remove("cortina");
    document.getElementById("body").classList.add("cierre");
    setTimeout(() => this.cerrarCortina(), 1000);
  }

  cerrarCortina(): void {
    document.getElementById("body").classList.remove("cierre");
    document.getElementById("body").classList.add("fondo");

    document.getElementsByTagName("app-footer").item(0).classList.remove("invisible")
    document.getElementsByTagName("app-footer").item(0).classList.add("visible");

    document.getElementsByTagName("app-navbar").item(0).classList.remove("invisible")
    document.getElementsByTagName("app-navbar").item(0).classList.add("visible");

    document.getElementsByTagName("app-carousel").item(0).classList.remove("invisible")
    document.getElementsByTagName("app-carousel").item(0).classList.add("visible");
  }

  /*checkTime(): boolean {
    let check = false;
    let session = localStorage.getItem("session");
    let time = Number(session);
    

    let control = new Date(time).getTime() + (2 * 60 * 1000);
    console.log(time); //muestra el tiempo que se logeo
    console.log(control); //muestra el tiempo para cargar imagen

    if (session == null || time > control) {
      console.log("time es mayor: " + time);
      localStorage.setItem("session", control.toString());
      check = true
    }

    return check;
  }*/

}
