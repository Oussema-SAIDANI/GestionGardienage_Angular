import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageLoginComponent } from './page-login/page-login.component';
import {Router, Routes, RouterModule} from '@angular/router';
import {FormsModule , ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './page-login/login.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboadComponent } from './dashboad/dashboad.component';
import { GestionAgentComponent } from './gestion-agent/gestion-agent.component';
import { TrajectoireComponent } from './trajectoire/trajectoire.component';
import { TrajectoireService } from './trajectoire/trajectoire.service';
import { AgmCoreModule } from '@agm/core';
import { NavComponent } from './nav/nav.component';
import { BeaconComponent } from './beacon/beacon.component';
import { EmplacementComponent } from './emplacement/emplacement.component';

import { httpInterceptorProviders } from './auth/auth-interceptor';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    PageLoginComponent,
    DashboadComponent,
    GestionAgentComponent,
    TrajectoireComponent,
    NavComponent,
    BeaconComponent,
    EmplacementComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    HttpClientModule  ],
  providers: [httpInterceptorProviders, LoginService,
    TrajectoireService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
