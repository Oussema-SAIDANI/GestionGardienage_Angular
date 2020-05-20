import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageLoginComponent } from './page-login/page-login.component';
import { DashboadComponent } from './dashboad/dashboad.component';
import { LoginService } from './page-login/login.service';
import { GestionAgentComponent } from './gestion-agent/gestion-agent.component';
import { TrajectoireComponent } from './trajectoire/trajectoire.component';
import { BeaconComponent } from './beacon/beacon.component';
import { EmplacementComponent } from './emplacement/emplacement.component';


const routes: Routes = [
  {path: 'login',
  component: PageLoginComponent} ,
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
},
  {path: 'home', component: DashboadComponent},
  {path: 'GestionAgent', component: GestionAgentComponent},
  {path: 'trajectoire', component: TrajectoireComponent},
  {path: 'beacon', component: BeaconComponent},
  {path: 'emplacement', component: EmplacementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
