import { Component, OnInit } from '@angular/core';
import { CrudService } from './crud.service';
import { AgentSecurity } from '../models/AgentSecurity';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import * as jquery from 'jQuery';
import * as bootstrap from 'Bootstrap';
import { Trajectoire } from '../models/Trajectoire';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-agent',
  templateUrl: './gestion-agent.component.html',
  styleUrls: ['./gestion-agent.component.css']
})
export class GestionAgentComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  agent: AgentSecurity = new AgentSecurity();
  agentSecurities: AgentSecurity[];
  Trajectoires: Trajectoire[];
  AgentForm: FormGroup;
  trajectoire: Trajectoire;
  updatedAgent: AgentSecurity = new AgentSecurity();
  //emplacement:Emplacement ;
  constructor(private router: Router ,private crudService: CrudService, private fb: FormBuilder,private token: TokenStorageService) {
    this.AgentForm = this.fb.group({
      nom: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]] ,
      prenom: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]] ,
      Matricule: ['', [Validators.required, Validators.pattern('[0-9]*')]] ,
    Cin: ['',[Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(8), Validators.minLength(8)]] ,
      Adresse: ['', [Validators.required, Validators.pattern('[a-zA-Z,. ]*')]] ,
      select: ['', Validators.required],
    });
     }

  ngOnInit() {
    if (this.token.getToken()) {
      this.isLoggedIn = true;
      this.isLoginFailed = true;
      this.roles = this.token.getAuthorities();
    }
    this.crudService.getAgent().subscribe(
      response => {this.agentSecurities = response; }
     );
    this.crudService.getAllTraejectoire().subscribe(
      response => {this.Trajectoires = response; }
     );
  }
  clicker()
  {
    this.router.navigateByUrl('/login') ;
  }
  onClick(event): void {
    $('#update').modal('show');
    const variable = event.target.value;
     // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.agentSecurities.length; i++) {
 // tslint:disable-next-line: triple-equals
  if (this.agentSecurities[i].id == variable) {
   this.updatedAgent = this.agentSecurities[i];
 }
}
 }
  deleteAgent(agent: AgentSecurity): void {
    if (confirm('Êtes-vous sures de supprimer cet Agent?')) {
    this.crudService.deleteAgent(agent)
      .subscribe( data => {

       this.agentSecurities = this.agentSecurities.filter(u => u !== agent);

      });
     }
     // else {return false;}
     //alert(JSON.stringify(agent)) ;
  }
  public onChange(event): void {
    const variable = event.target.value;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.Trajectoires.length; i++) {
     // tslint:disable-next-line: triple-equals
     if (this.Trajectoires[i].id == variable) {
       this.trajectoire = this.Trajectoires[i];
     }
   }
  }
addAgent(): void {
  this.agent.trajectoire = this.trajectoire;
  //console.log(JSON.stringify(this.trajectoire));
  this.crudService.addAgent(this.agent).subscribe( data => {
  // document.getElementById('feragh')[0].reset();
  alert('Ajout avec succés!');
  location.reload();
  });
}
update(agent: AgentSecurity): void {

 $('#update').modal('show');
 $('#nom').val(agent.nom as string);
 $('#prenom').val(agent.prenom as string);
 $('#Matricule').val(agent.matricule as number);
 $('#Cin').val(agent.cin as number);
 $('#Adresse').val(agent.adresse as string);
// tslint:disable-next-line: align
}
updateAgent(agent: AgentSecurity): void {
  this.crudService.updateAgent(agent).subscribe(data => {
    alert('Modification avec succés!');
    location.reload();
    });
  }
data(event): void {
  $('#myModal').modal('show');
}


}
