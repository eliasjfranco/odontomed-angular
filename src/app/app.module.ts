import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TurnosComponent } from './components/turnos/turnos.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarHeaderComponent } from './utils/calendar-header/calendar-header.component'
import { registerLocaleData, DatePipe } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { RegistroComponent } from './components/registro/registro.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { GalleryModule } from 'ng-gallery';
import { IndexComponent } from './components/index/index.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { UbicacionComponent } from './components/ubicacion/ubicacion.component';
import { PasswordComponent } from './components/password/password.component';
import { MatDialogModule } from '@angular/material/dialog';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TurnosComponent,
    CalendarHeaderComponent,
    RegistroComponent,
    NavbarComponent,
    FooterComponent,
    CarouselComponent,
    IndexComponent,
    ContactoComponent,
    UbicacionComponent,
    PasswordComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    NoopAnimationsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    GalleryModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  exports: [
    MatFormFieldModule, MatInputModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
