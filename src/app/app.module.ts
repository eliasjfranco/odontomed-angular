import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TurnosComponent } from './components/turnos/turnos.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarHeaderComponent } from './utils/calendar-header/calendar-header.component'
import { registerLocaleData, DatePipe } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { AlertTurnDirective } from './utils/alert/alert-turn.directive';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TurnosComponent,
    CalendarHeaderComponent,
    AlertTurnDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NoopAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
