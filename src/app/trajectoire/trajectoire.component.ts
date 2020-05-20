import { Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { Emplacement } from '../models/Emplacement';
import { TrajectoireService } from './trajectoire.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Trajectoire } from '../models/Trajectoire';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-trajectoire',
  templateUrl: './trajectoire.component.html',
  styleUrls: ['./trajectoire.component.css']
})
export class TrajectoireComponent implements OnInit {

  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  trajectoire: Trajectoire = new Trajectoire();
  Emplacements: Emplacement[];
  emp: Emplacement[];
  Trajectoires: Trajectoire[];
  emplacement: Emplacement;
  traJ: Trajectoire;
  TrajectoireForm: FormGroup;
  p = ' ';
  updatedTrajectoire: Trajectoire = new Trajectoire();
  /*lat: Number;
  lng: Number;
  latitudes: Number[];
  longitudes: Number[];
  latitude = 36.816714582548094;
  longitude = 10.181010961532593;
  locationChosen = false;*/
  // @ViewChild('td', { static: false }) td: ElementRef;
  // tslint:disable-next-line: no-shadowed-variable
  constructor(private router: Router , private TrajectoireService: TrajectoireService, private fb: FormBuilder,
              private token: TokenStorageService) {
    this.TrajectoireForm = this.fb.group({
      nom: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      select: ['', Validators.required]
    });
   }

  ngOnInit() {
   // const p =  document.createElement('br');
   // const x = document.getElementById('td');

  /*  p += '<td style="color:black;width:170px;" class=" body text-center" >';*/
  if (this.token.getToken()) {
    this.isLoggedIn = true;
    this.isLoginFailed = true;
    this.roles = this.token.getAuthorities();
  }
   this.TrajectoireService.getAllEmplacements().subscribe(
      response => {this.Emplacements = response; }
     );
   this.TrajectoireService.getTrajectoire().subscribe(
      response => {this.Trajectoires = response;
                   this.emp = this.Trajectoires.values().next().value.emplacements;
                   this.p += '{ ';
                    // tslint:disable-next-line: prefer-for-of
                   for (let i = 0 ; i < this.emp.length ; i++) {
                   this.p +=  this.emp[i].nom + ' ';
                   }
                   this.p += '}';
                /*   p += '</td>';
                  x.appendChild(p);*/

            }
     );
  }
  onClick(event): void {
    $('#update').modal('show');
    const variable = event.target.value;
     // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.Trajectoires.length; i++) {
 // tslint:disable-next-line: triple-equals
  if (this.Trajectoires[i].id == variable) {
   this.updatedTrajectoire = this.Trajectoires[i];
 }
}
 }
 // public onChange(event): void {
  /* const variable = event.target.value;
   // tslint:disable-next-line: prefer-for-of
   for (let i = 0; i < this.Emplacements.length; i++) {
    // tslint:disable-next-line: triple-equals
    if (this.Emplacements[i].id == variable) {
      this.emplacement = this.Emplacements[i];
     // this.empl.push(this.emplacement);
    //  console.log(this.empl);
    }
   }*/

//}
  /*
   this.lat = this.emplacement.latitude;
   this.lng = this.emplacement.longitude;
   console.log(JSON.stringify(this.emplacement));
  }*/
/*onChangeMAP(event): void {
  const variable = event.target.value;
   // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < this.Trajectoires.length; i++) {
    // tslint:disable-next-line: triple-equals
    if (this.Trajectoires[i].id == variable) {
      this.traJ = this.Trajectoires[i];
    }
  }
  const x = this.traJ.emplacements;
   // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < x.length; i++) {
   this.latitudes.push(x[i].latitude);
      }
}*/

addTrajectoire(): void {
 // this.trajectoire.emplacements.push(this.emplacement);
 // this.trajectoire.emplacements.push(this.emplacement);
 /* const trajectoireEmplacements: Emplacement[] = this.TrajectoireForm.controls['selectedEmplacment'].value;
  this.trajectoire.emplacements = trajectoireEmplacements;*/
  this.TrajectoireService.addAgent(this.trajectoire).subscribe( data => {
    alert('Ajout avec succés!');
    location.reload();
      });

}
data(event): void {
  $('#myModal').modal('show');
}
/*onChooseLocation(event) {
this.lat = event.coords.lat;
this.lng = event.coords.lng;
this.locationChosen = true;
}*/
deleteTrajectoire(trajectoire: Trajectoire): void {
  if (confirm('Êtes-vous sures de supprimer cet Trajectoire?')) {
  this.TrajectoireService.deleteTrajectoire(trajectoire)
    .subscribe( data => {

     this.Trajectoires = this.Trajectoires.filter(u => u !== trajectoire);

    });
   }
}
updateTrajectoire(): void {
  this.TrajectoireService.updateTrajectoire( this.updatedTrajectoire).subscribe(
     data => {
       alert('modification avec succés!');
       location.reload();
     }
   );
 }
 clicker()
{
  this.router.navigateByUrl('/login') ;
}
}

