import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Beacon } from '../models/Beacon';
import { Emplacement } from '../models/Emplacement';
import { AgentSecurity } from '../models/AgentSecurity';

@Injectable({
  providedIn: 'root'
})
export class AffichageService {

  constructor(private http: HttpClient) { }
  getEmplacementNumber() {
    return this.http.get<number>('http://localhost:8080/emplacement/number');
  }
  getBeaconNumber() {
    return this.http.get<number>('http://localhost:8080/beacon/number');
  }
  getTrajectoireNumber() {
    return this.http.get<number>('http://localhost:8080/trajectoire/number');
  }
  getAgentNumber() {
    return this.http.get<number>('http://localhost:8080/api/number');
  }
  getAllBeacon() {
    return this.http.get<Beacon[]>('http://localhost:8080/beacon/all');
  }
  getAllEmplacement() {
    return this.http.get<Emplacement[]>('http://localhost:8080/emplacement/all');
  }
  getAllAgent() {
    return this.http.get<AgentSecurity[]>('http://localhost:8080/api/all');
  }
}
