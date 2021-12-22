import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { TurnosComponent } from './components/turnos/turnos.component';
import { AuthGuard } from './services/guard/auth-guard';

const routes: Routes = [
  {path:'', component: IndexComponent},
  {path:'login', component: LoginComponent},
  {path:'turnos', component: TurnosComponent},
  {path:'registro', component: RegistroComponent},
  {path:'carousel', component: CarouselComponent},
  {path:'contacto', component: ContactoComponent, canActivate: [AuthGuard]},
  {path:'**', redirectTo:'/', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
