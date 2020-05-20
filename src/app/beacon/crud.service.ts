import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Beacon } from '../models/Beacon';
import { Emplacement } from '../models/Emplacement';

const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }
  getBeacon() {
    return this.http.get<Beacon[]>('http://localhost:8080/beacon/all');
  }
  public deleteBeacon(beacon) {
    return this.http.delete<Beacon>('http://localhost:8080/beacon/delete' + '/' + beacon.id);
  }
 // addAgent( agent : AgentSecurity) : Observable<any>{
  addBeacon( beacon): Observable<any> {
    return this.http.post<Beacon>('http://localhost:8080/beacon/add' , beacon  ) ;
}
public updateAgent(beacon): Observable<any> {
  return this.http.put<Beacon>('http://localhost:8080/beacon/update/' + beacon.id, beacon, httpOptions);

}
/////
getEmplacement(id) {
  return this.http.get<Emplacement>('http://localhost:8080/beacon/emplacement/' + id);
}
getEmplacementAll() {
  return this.http.get<Emplacement[]>('http://localhost:8080/emplacement/all');
}
}
