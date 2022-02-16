import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Turno_Persona } from 'src/app/model/turno_persona';
import { TurnosService } from 'src/app/services/turnos.service';
import { CalendarEvent, CalendarMonthViewBeforeRenderEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { DatePipe, DOCUMENT } from '@angular/common';
import { Turno } from 'src/app/model/turno';
import { plainToClass } from 'class-transformer';
import { TurnoPersona } from 'src/app/model/response/turno-persona';
import { Router } from '@angular/router';
import { ErrorNotificacion } from 'src/app/services/error-notificacion';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-turnos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css'],
  styles: [
    ` 
      .cal-month-view .bg-pink,
      .cal-week-view .cal-day-columns .bg-pink,
      .cal-day-view .bg-pink {
        background-color: #e35d6a !important;
      }
      .bg-green {
        background-color: #479f76 !important;
      }
    `,
  ]
})
export class TurnosComponent implements OnInit {

  @ViewChild("vf", { read: ViewContainerRef }) vf: ViewContainerRef;

  show: boolean = false;

  filtro: Promise<boolean>;

  alertTurn = false;

  turnoPersona: Turno_Persona[] = [];

  horario: Turno[] = [];

  turno: Turno[] = [];

  locale: string = 'es';

  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  excludeDays: number[] = [0, 1];

  clickedDate: Date;

  now = new Date();

  dia: string;

  dayblock: boolean = false;

  formatDate: string[] = ['yyyy-MM-dddd'];

  constructor(
    private turnoService: TurnosService,
    private datePipe: DatePipe,
    private router: Router,
    private alerta: ErrorNotificacion,
    private cd: ChangeDetectorRef,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.show = false;

    this.turnoPersona = this.obtenerTurnos();

    this.turno = this.obtenerIdTurnos();
  }


  beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
    this.blockTurnos().subscribe(p => {
      let fecha = this.getFechas(p.cant)
      for (let m = 0; m < renderEvent.body.length; m++) {
        if (renderEvent.body[m].date < this.now) {
          renderEvent.body[m].cssClass = 'bg-pink';
        } else {
          let dia = this.datePipe.transform(renderEvent.body[m].date, 'yyyy-MM-dd');
          if (fecha.indexOf(dia) === -1) {
            renderEvent.body[m].cssClass = 'bg-green';
          } else {
            renderEvent.body[m].cssClass = 'bg-pink';
          }
          this.cd.detectChanges();
        }
      }
    });
  }

  clickDate(date: Date): void {
    this.horario = this.turno.slice();
    this.dia = this.datePipe.transform(date, 'dd-MM-yyyy');
    this.turnoPersona.forEach(t => {
      if (this.datePipe.transform(date, 'yyyy-MM-dd') == t.fecha) {
        this.horario = this.horario.filter((item) => {
          return item.id != t.id_horario
        });
      }
    });
    if (date >= this.now && this.horario.length)
      this.show = true;
    else
      this.show = false;
  }


  agendar(id: number, clickedDate: Date, i: number): void {
    let hora = new Turno();
    let fecha = new TurnoPersona();
    let turno = new Turno_Persona(this.datePipe.transform(clickedDate, 'dd/MM/yyyy'), id);
    if (this.loginService.isLogged()) {
      this.turnoService.saveTurno(turno).subscribe(
        t => {
          fecha = plainToClass(TurnoPersona, t)
          hora = plainToClass(Turno, fecha.turno)
          this.alerta.showError(202, "Turno Agendado con exito: " + this.datePipe.transform(fecha.fecha, 'dd/MM/yyyy') + " Hora: " + hora.hs, 'okTurn');
          setTimeout(() => this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/turnos'])
          }), 5000);

        }
      );
      this.alertTurn = true
    } else {
      this.router.navigate(['/login']);
      this.alerta.showError(200, "Debe volver a iniciar sesión", 'info');
    }

  }

  obtenerTurnos(): Turno_Persona[] {
    let turnoPersona: Turno_Persona[] = [];
    this.turnoService.getAll().subscribe((e => {
      e.forEach(obj => {
        turnoPersona.push(obj);
      });
    })
    );
    return turnoPersona;
  }

  obtenerIdTurnos(): Turno[] {
    let turno: Turno[] = [];
    this.turnoService.getIdTurnos().subscribe(
      t => t.forEach(p => {
        turno.push(p);
      })
    );
    return turno;
  }

  blockTurnos() {
    return this.turnoService.getCantId();
  }

  getFechas(cant: number) {
    let turnos = [];
    let set = new Set();
    for (let i = 0; i < this.turnoPersona.length; i++) {
      turnos.push(this.turnoPersona[i].fecha);
    }
    const indices = new Set(turnos)
    turnos.pop();
    for (let item of indices) {
      const dayblock = this.turnoPersona.filter(p => p.fecha == item);
      if (dayblock.length == cant) {
        set.add(item)
      }
    }
    return Array.from(set);
  }

}