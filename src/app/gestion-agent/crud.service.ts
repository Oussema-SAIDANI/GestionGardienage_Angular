import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgentSecurity } from '../models/AgentSecurity';
import { Observable } from 'rxjs';
import { Trajectoire } from '../models/Trajectoire';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CrudService {


  constructor(private http: HttpClient) { }

  getAgent() {
    return this.http.get<AgentSecurity[]>('http://localhost:8080/api/all');
  }
  public deleteAgent(agent) {
    return this.http.delete<AgentSecurity>('http://localhost:8080/api/delete' + '/' + agent.agent_id);
  }
 // addAgent( agent : AgentSecurity) : Observable<any>{
  addAgent( agent): Observable<any> {
    return this.http.post<AgentSecurity>('http://localhost:8080/api/add' , agent  ) ;
}
public updateAgent(agent): Observable<any> {
  return this.http.put<AgentSecurity>('localhost:8080/api/update/' + agent.agent_id, agent, httpOptions);

}
////////////////////////////////////////////////
public getAllTraejectoire() {
  return this.http.get<Trajectoire[]>('http://localhost:8080/trajectoire/all');
}
}
