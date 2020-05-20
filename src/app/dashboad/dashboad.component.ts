import { Component, OnInit } from '@angular/core';
import { AffichageService } from './affichage.service';
import { Beacon } from '../models/Beacon';
import { Emplacement } from '../models/Emplacement';
import { AgentSecurity } from '../models/AgentSecurity';
import { Trajectoire } from '../models/Trajectoire';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboad',
  templateUrl: './dashboad.component.html',
  styleUrls: ['./dashboad.component.css']
})
export class DashboadComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  traj: Trajectoire;
  agents: AgentSecurity[];
  variable: string;
  UnEmp: Emplacement;
  emplacements: Emplacement[];
  beacons: Beacon[];
  nombreEmplacement: number;
  nombreBeacon: number;
  nombreTrajectoire: number;
  nombreAgent: number;
  latitude = 36.816714582548094;
  longitude = 10.181010961532593;
  constructor(private router: Router ,private Service: AffichageService, private token: TokenStorageService) { }
  info: any;

  ngOnInit() {
   /* this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };*/
    if (this.token.getToken()) {
      this.isLoggedIn = true;
      this.isLoginFailed = true;
      this.roles = this.token.getAuthorities();
    }
    this.Service.getEmplacementNumber().subscribe(
      response => {this.nombreEmplacement = response ; }
    );
    this.Service.getTrajectoireNumber().subscribe(
      response => {this.nombreTrajectoire = response ; }
    );
    this.Service.getBeaconNumber().subscribe(
      response => {this.nombreBeacon = response ; }
    );
    this.Service.getAgentNumber().subscribe(
      response => {this.nombreAgent = response ; }
    );
    this.Service.getAllBeacon().subscribe(
      response => {this.beacons = response; }
    );
    this.Service.getAllEmplacement().subscribe(
      response => {this.emplacements = response; }
    );
    this.Service.getAllAgent().subscribe(
      response => {this.agents = response; }
    );
  }
  onChange(event): void {
     this.variable = event.target.value;
      // tslint:disable-next-line: prefer-for-of
     for (let i = 0; i < this.emplacements.length; i++) {
  // tslint:disable-next-line: triple-equals
   if (this.emplacements[i].beacon.reference == this.variable) {
   this.UnEmp = this.emplacements[i];
  }
}
  }
  onChangeAgent(event): void {
  const variable = event.target.value;
   // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < this.agents.length; i++) {
    // tslint:disable-next-line: triple-equals
     if (this.agents[i].nom == variable) {
     this.traj = this.agents[i].trajectoire;
    }
  }
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }
clicker()
{
  this.router.navigateByUrl('/login') ;
}
}
