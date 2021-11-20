import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import { Turno_Persona } from 'src/app/model/turno_persona';
import { TurnosService } from 'src/app/services/turnos.service';
import { CalendarEvent, CalendarMonthViewBeforeRenderEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { DatePipe } from '@angular/common';
import { Turno } from 'src/app/model/turno';
import { plainToClass } from 'class-transformer';
import { TurnoPersona } from 'src/app/model/response/turno-persona';
import { AlertComponent } from 'src/app/utils/alert/alert-component';
import { Router } from '@angular/router';
import { ErrorNotificacion } from 'src/app/services/error-notificacion';

@Component({
  selector: 'app-turnos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css'],
  styles:[
    `
      .cal-month-view .bg-pink,
      .cal-week-view .cal-day-columns .bg-pink,
      .cal-day-view .bg-pink {
        background-color: hotpink !important;
      }
    `,
  ]
})
export class TurnosComponent implements OnInit {

  @ViewChild("vf", {read:ViewContainerRef}) vf:ViewContainerRef;

  show = false;

  alertTurn = false;

  turnoPersona: Turno_Persona[] = [];

  horario: Turno[] = [];

  turno: Turno[] = [];

  locale: string='es';
  
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  excludeDays: number[] = [0,1];

  clickedDate: Date;

  now = new Date();

  dia: string;

  formatDate: string[] = ['yyyy-MM-dddd'];

  constructor(
    private turnoService:TurnosService,
    private datePipe:DatePipe,
    private router:Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private alerta: ErrorNotificacion
  ) { }

  ngOnInit(): void {
    this.show = false;
    this.turnoPersona = this.obtenerTurnos();
    //Obtenemos todos los turnos

    this.turno = this.obtenerIdTurnos();

    //Obtenemos todos los ID posibles de horarios
    

  }

  beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
    renderEvent.body.forEach((day) => {
      const d = day.date
      if (d < this.now) {
        day.cssClass = 'bg-pink';
      }
    });
  }

  clickDate(date:Date): void{
    this.horario = this.turno.slice();
    this.dia = this.datePipe.transform(this.clickedDate, 'dd-MM-yyyy');

    if(date > this.now)
      this.show = true;
    else
      this.show = false;

    this.turnoPersona.forEach(t => {
        if(this.datePipe.transform(date, 'yyyy-MM-dd') == t.fecha){
          this.horario = this.horario.filter((item)=> {
            return item.id != t.id_horario
          });
        }
    });
  }


  //TERMINAR SERVICIO DE AGENDAR TURNO MEDIANTE API
  agendar(id:number, clickedDate:Date, i:number): void{
    let hora = new Turno();
    let fecha = new TurnoPersona();
    let turno = new Turno_Persona(this.datePipe.transform(clickedDate, 'dd/MM/yyyy'), id);
    this.turnoService.saveTurno(turno).subscribe( 
      t => {
        fecha = plainToClass(TurnoPersona, t)
        hora = plainToClass(Turno, fecha.turno)
        this.alerta.showError(202, "Turno Agendado con exito:" + fecha + " Hora: " + hora, 'okTurn');
        //this.createComponent();
        setTimeout(() => this.router.navigateByUrl('', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/turnos'])
        }), 5000);

      }
      );
      this.alertTurn = true
  }

  obtenerTurnos():Turno_Persona[]{
    let turnoPersona: Turno_Persona[] = [];
    this.turnoService.getAll().subscribe((e => {
      e.forEach(obj => {
        turnoPersona.push(obj);
        });
      })
    );
    return turnoPersona;
  }

  obtenerIdTurnos():Turno[]{
    let turno: Turno[] = [];
    this.turnoService.getIdTurnos().subscribe(
      t => t.forEach(p => {
        turno.push(p)
      })
    );
    return turno;
  }

  /*public createComponent(): void{
    const component = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    this.vf.createComponent(component);
  }*/
}