import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Turno_Persona } from 'src/app/model/turno_persona';
import { TurnosService } from 'src/app/services/turnos.service';
import { CalendarEvent, CalendarMonthViewBeforeRenderEvent, CalendarView, DAYS_OF_WEEK } from 'angular-calendar';
import { DatePipe } from '@angular/common';
import { Turno } from 'src/app/model/turno';

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

  show = false;

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

  formatDate: string[] = ['yyyy-MM-dddd'];

  constructor(
    private turnoService:TurnosService,
    private datePipe:DatePipe
  ) { }

  ngOnInit(): void {

    //Obtenemos todos los turnos
    this.turnoService.getAll().subscribe(
      e => e.forEach(obj => {
        this.turnoPersona.push(obj);
      })
    );

    //Obtenemos todos los ID posibles de horarios
    this.turnoService.getIdTurnos().subscribe(
      t => t.forEach(p => {
        this.turno.push(p)
      })
    )

    console.log(this.turnoPersona)

    console.log(this.turno)

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

    if(date > this.now)
      this.show = true;
    else
      this.show = false;

    console.log(this.show)

    this.turnoPersona.forEach(t => {
        if(this.datePipe.transform(date, 'yyyy-MM-dd') == t.fecha){
          this.horario = this.horario.filter((item)=> {
            return item.id != t.id_horario
          });
        }
    });

    console.log(this.horario);
  }
}