import { Component, OnInit } from '@angular/core';
import { Emplacement } from '../models/Emplacement';
import { CrudEmpService } from './crud-emp.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Beacon } from '../models/Beacon';
import { AgmMarker } from '@agm/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-emplacement',
  templateUrl: './emplacement.component.html',
  styleUrls: ['./emplacement.component.css']
})
export class EmplacementComponent implements OnInit {

  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  emplacements: Emplacement[];
  bool = false;
  beacons: Beacon[];
  beacon: Beacon;
  emplacement: Emplacement = new Emplacement();
  updatedEmplacement: Emplacement = new Emplacement();
  EmplacementForm: FormGroup;
  lat: number;
  lng: number;
  locationChosen = false;
  latitude = 36.816714582548094;
  longitude = 10.181010961532593;
  constructor(private router: Router , private crudService: CrudEmpService, private fb: FormBuilder,private token: TokenStorageService) {
    this.EmplacementForm = this.fb.group({
      nom: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]] ,
      select: ['', Validators.required],

    });
  }

  ngOnInit() {
    if (this.token.getToken()) {
      this.isLoggedIn = true;
      this.isLoginFailed = true;
      this.roles = this.token.getAuthorities();
    }
    this.crudService.getEmplacement().subscribe(
      response => {this.emplacements = response;
                   // tslint:disable-next-line: triple-equals
                   if (this.emplacements.length != 0) {
          this.bool = true;
        }
      }
     );
    this.crudService.getAllBeacons().subscribe(
       response => {this.beacons = response; }
     );

  }
  clicker()
  {
    this.router.navigateByUrl('/login') ;
  }
  deleteEmplacement(emplacement: Emplacement): void {
    if (confirm('Êtes-vous sures de supprimer cet Emplacement?')) {
    this.crudService.deleteEmplacement(emplacement)
      .subscribe( data => {

       this.emplacements = this.emplacements.filter(u => u !== emplacement);

      });
     }
  }
  onChange(event): void {
    const variable = event.target.value;
      // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.beacons.length; i++) {
  // tslint:disable-next-line: triple-equals
   if (this.beacons[i].id == variable) {
    this.beacon = this.beacons[i];
  }
}
  }
  onChooseLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChosen = true;
    }
  addEmplacement(): void {
    this.emplacement.beacon = this.beacon;
    this.emplacement.latitude = this.lat;
    this.emplacement.longitude = this.lng;
    this.crudService.addEmplacement(this.emplacement).subscribe( data => {
    alert('Ajout avec succés!');
    location.reload();
    });
  }
  updateEmplacement(): void {
    // console.log(this.updatedBeacon);
    this.updatedEmplacement.beacon = this.beacon;
    this.updatedEmplacement.latitude = this.lat;
    this.updatedEmplacement.longitude = this.lng;
    this.crudService.updateEmplacement( this.updatedEmplacement).subscribe(
       data => {
         alert('modification avec succés!');
         location.reload();
       }
     );
   }
  data(event): void {
    $('#myModal').modal('show');
  }
  onClick(event): void {
    $('#update').modal('show');
    const variable = event.target.value;
     // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.emplacements.length; i++) {
 // tslint:disable-next-line: triple-equals
  if (this.emplacements[i].id == variable) {
   this.updatedEmplacement = this.emplacements[i];
 }
}
 }
}
