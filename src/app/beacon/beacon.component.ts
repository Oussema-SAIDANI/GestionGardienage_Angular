import { Component, OnInit } from '@angular/core';
import { CrudService } from './crud.service';
import { Beacon } from '../models/Beacon';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Emplacement } from '../models/Emplacement';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beacon',
  templateUrl: './beacon.component.html',
  styleUrls: ['./beacon.component.css']
})
export class BeaconComponent implements OnInit {

  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  Beacons: Beacon[];
  beacon: Beacon = new Beacon();
  BeaconForm: FormGroup;
  emplacement: Emplacement;
  Emplacement: Emplacement[];
  updatedBeacon: Beacon = new Beacon();
  constructor(private router: Router ,private crudService: CrudService, private fb: FormBuilder,private token: TokenStorageService) {
    this.BeaconForm = this.fb.group({
      nom: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]] ,
      reference: ['', Validators.required],
    });
   }

  ngOnInit() {
    if (this.token.getToken()) {
      this.isLoggedIn = true;
      this.isLoginFailed = true;
      this.roles = this.token.getAuthorities();
    }
    this.crudService.getBeacon().subscribe(
      response => {this.Beacons = response; }
     );
    this.crudService.getEmplacementAll().subscribe(
      response => {this.Emplacement = response; }
     );
    //console.log( this.BeaconForm.controls['updateData'].value);
  }
  clicker()
  {
    this.router.navigateByUrl('/login') ;
  }
  deleteBeacon(beacon: Beacon): void {
    if (confirm('Êtes-vous sures de supprimer ce Beacon?')) {
    this.crudService.deleteBeacon(beacon)
      .subscribe( data => {

       this.Beacons = this.Beacons.filter(u => u !== beacon);
      });
     }
  }
  addBeacon(): void {
    this.crudService.addBeacon(this.beacon).subscribe( data => {
    alert('Ajout avec succés!');
    location.reload();
    });
  }
 /* afficher(): void {
       // tslint:disable-next-line: prefer-for-of
       for (let i = 0; i < this.Beacons.length; i++) {
        this.crudService.getEmplacement(this.Beacons[i].id).subscribe( response => {this.emplacement = response; });
        this.Emplacement.push(this.emplacement);
        }
  }*/
  updateBeacon(): void {
   // console.log(this.updatedBeacon);
   this.crudService.updateAgent( this.updatedBeacon).subscribe(
      data => {
        alert('modification avec succés!');
        location.reload();
      }
    );
  }
  onClick(event): void {
     $('#update').modal('show');
     const variable = event.target.value;
      // tslint:disable-next-line: prefer-for-of
     for (let i = 0; i < this.Beacons.length; i++) {
  // tslint:disable-next-line: triple-equals
   if (this.Beacons[i].id == variable) {
    this.updatedBeacon = this.Beacons[i];
  }
}
  }
  data(event): void {
    $('#myModal').modal('show');
  }
}
